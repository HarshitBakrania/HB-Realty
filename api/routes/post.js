import express from "express";
import { authMiddleware } from "../middleware.js";
import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken";

const router = express.Router();

router.get("/", async (req, res) => {
  const query = req.query;
  console.log(query);
  try {
    const posts = await prisma.post.findMany({
      where: {
        city: query.city || undefined,
        type: query.type || undefined,
        property: query.property || undefined,
        bedroom: parseInt(query.bedroom) || undefined,
        price: {
          gte: parseInt(query.minPrice) || 0,
          lte: parseInt(query.maxPrice) || 1000000000,
        },
      },
    });
    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to get posts",
    });
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const post = await prisma.post.findUnique({
      where: { id },
      include: {
        postDetail: true,
        user: {
          select: {
            username: true,
            avatar: true,
          },
        },
      },
    });


    const token = req.cookies?.authToken;

    if (token) {
      jwt.verify(token, process.env.JWT_SECRET, async (err, payload) => {
        if (err) {
            console.log(err)
        }
        if (!err) {
          const saved = await prisma.savedPost.findUnique({
            where: {
              userId_postId: {
                postId: id,
                userId: payload.id,
              }
            }
          });
          res.status(200).json({ ...post, isSaved: saved ? true : false });
        }
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to get post",
    });
  }
});

router.post("/", authMiddleware, async (req, res) => {
  const body = req.body;
  const userIdToken = req.userId;
  try {
    const newPost = await prisma.post.create({
      data: {
        ...body.postData,
        userId: userIdToken,
        postDetail: {
          create: body.postDetail,
        },
      },
    });
    res.status(200).json(newPost);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to create posts",
    });
  }
});

router.put("/:id", authMiddleware, (req, res) => {
  try {
    res.status(200).json();
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to update post",
    });
  }
});

router.delete("/:id", authMiddleware, async (req, res) => {
  const id = req.params.id;
  const userIdToken = req.userId;
  try {
    const post = await prisma.post.findUnique({
      where: { id },
    });

    if (post.userId !== userIdToken) {
      return res.status(403).json({
        message: "Unauthorized",
      });
    }

    await prisma.post.delete({
      where: { id },
    });

    res.status(200).json({ message: "Post deleted!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to delete post",
    });
  }
});

export default router;
