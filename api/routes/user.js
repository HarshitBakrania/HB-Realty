import express from "express";
import { authMiddleware } from "../middleware.js";
import prisma from "../lib/prisma.js";
import bcrypt from "bcrypt";

const router = express.Router();

router.get("/me", authMiddleware, (req, res) => {
    console.log(req.userId);
    res.send("Hello World!");
});

router.get("/", async(req, res) =>{
    try{
        const users = await prisma.user.findMany();
        res.status(200).json(users)
    }catch(error){
        console.log(error)
        res.status(500).json({message: "failed to get users!"})
    }
})

router.get("/:id", authMiddleware, async(req, res) =>{
    const id = req.params.id
    try{
        const user = await prisma.user.findUnique({
            where: { id }
        })
        res.status(200).json(user)
    }catch(error){
        console.log(error)
        res.status(500).json({message: "failed to get user!"})
    }
    
})

router.put("/:id", authMiddleware, async(req, res) =>{
    const id = req.params.id;
    const userIdToken = req.userId;
    const { password, avatar, ...inputs } = req.body;

    if(id !== userIdToken){
        return res.status(403).json({
            message: "Unauthorized"
        })
    }

    let updatedPassword = null;
    try{
        if(password){
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

        const {password: userPassword, ...accountInfo} = updatedUser
        res.status(200).json(accountInfo)
    }catch(error){
        console.log(error)
        res.status(500).json({message: "failed to update user!"})
    }
})

router.delete("/:id", authMiddleware, async(req, res) =>{
    const id = req.params.id;
    const userIdToken = req.userId;

    if(id !== userIdToken){
        return res.status(403).json({
            message: "Unauthorized"
        })
    }

    try{
        const deletedUser = await prisma.user.delete({
            where: { id },
        });
        res.status(200).json({message: `${deletedUser.username} deleted!`})
    }catch(error){
        console.log(error)
        res.status(500).json({message: "failed to delete user!"})
    } 
})

export default router;