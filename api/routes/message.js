import express from "express";
import { authMiddleware } from "../middlewares/middleware.js";
import prisma from "../lib/prisma.js";

const router = express.Router();

router.post("/:chatId", authMiddleware, async (req, res) => {
    console.log("Add new message endpoint")
    const userIdToken = req.userId;
    const chatId = req.params.chatId;
    const text = req.body.text;
    try{
        const chat = await prisma.chat.findUnique({
            where:{
                id: chatId,
                userIDs:{
                    hasSome:[userIdToken]
                }
            }
        });

        if(!chat){
            return res.status(404).json({
                message: "Chat not found"
            })
        }

        const message = await prisma.message.create({
            data:{
                text,
                chatId,
                userId: userIdToken
            }
        })

        await prisma.chat.update({
            where:{
                id: chatId
            },
            data:{
                seenBy:[userIdToken],
                lastMessage: text
            }
        })
        res.status(200).json(message);
    }catch(erorr){
        console.log(error)
        res.status(500).json({ message: "Failed to add new message"});
    }
})

export default router;