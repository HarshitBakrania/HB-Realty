import express from "express";
import { authMiddleware } from "../middlewares/middleware.js";
import prisma from "../lib/prisma.js";
import bcrypt from "bcrypt";

const router = express.Router();

router.get("/me", authMiddleware, (req, res) => {
  console.log(req.userId);
  res.send("Hello World!");
});

router.get("/", async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "failed to get users!" });
  }
});

router.get("/userPosts", authMiddleware, async (req, res) => {
  const userIdToken = req.userId;
  try {
    const userPosts = await prisma.post.findMany({
      where: {
        userId: userIdToken,
      },
    });
    const saved = await prisma.savedPost.findMany({
      where: {
        userId: userIdToken,
      },
      include: {
        post: true,
      },
    });
    const savedPosts = saved.map((item) => item.post);
    res.status(200).json({ userPosts: userPosts, savedPosts: savedPosts });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "failed to get user posts!" });
  }
});

router.delete("/:id", authMiddleware, async (req, res) => {
  const id = req.params.id;
  const userIdToken = req.userId;

  if (id !== userIdToken) {
    return res.status(403).json({
      message: "Unauthorized",
    });
  }

  try {
    const deletedUser = await prisma.user.delete({
      where: { id },
    });
    res.status(200).json({ message: `${deletedUser.username} deleted!` });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "failed to delete user!" });
  }
});

router.get("/notification", authMiddleware, async (req, res) => {
  const userIdToken = req.userId;
  try {
    const number = await prisma.chat.count({
      where: {
        userIDs: {
          hasSome: [userIdToken],
        },
        NOT: {
          seenBy: {
            hasSome: [userIdToken],
          },
        },
      },
    });
    res.status(200).json(number);
    console.log(number)
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "failed to get notifications!" });
  }
});

router.get("/:id", authMiddleware, async (req, res) => {
  const id = req.params.id;
  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "failed to get user!" });
  }
});

router.put("/:id", authMiddleware, async (req, res) => {
  const id = req.params.id;
  const userIdToken = req.userId;
  const { password, avatar, ...inputs } = req.body;

  if (id !== userIdToken) {
    return res.status(403).json({
      message: "Unauthorized",
    });
  }

  let updatedPassword = null;
  try {
    if (password) {
      updatedPassword = await bcrypt.hash(password, 10);
    }
    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        ...inputs,
        ...(updatedPassword ? { password: updatedPassword } : {}),
        ...(avatar ? { avatar } : {}),
      },
    });

    const { password: userPassword, ...accountInfo } = updatedUser;
    res.status(200).json(accountInfo);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "failed to update user!" });
  }
});

router.post("/save", authMiddleware, async (req, res) => {
  console.log("save endpoint");
  const postId = req.body.postId;
  const userIdToken = req.userId;

  try {
    const savedPost = await prisma.savedPost.findUnique({
      where: {
        userId_postId: {
          userId: userIdToken,
          postId: postId,
        },
      },
    });
    if (savedPost) {
      await prisma.savedPost.delete({
        where: {
          id: savedPost.id,
        },
      });
      res.status(200).json({ message: "Post removed from saved list!" });
    } else {
      await prisma.savedPost.create({
        data: {
          userId: userIdToken,
          postId,
        },
      });
      res.status(200).json({ message: "Post added to saved list!" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "failed to save post!" });
  }
});

export default router;
