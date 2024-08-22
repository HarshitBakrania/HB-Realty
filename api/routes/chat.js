import express from "express";
import { authMiddleware } from "../middlewares/middleware.js";
import prisma from "../lib/prisma.js";

const router = express.Router();

router.get("/", authMiddleware, async(req, res) =>{
    console.log("Chats endpoint")
    const userIdToken = req.userId;
    try{
        const chats = await prisma.chat.findMany({
            where:{
                userIDs:{
                    hasSome:[userIdToken]
                }
            }
        })
        for(const chat of chats){
            const receiverId = chat.userIDs.find(id => id !== userIdToken);

            const receiver = await prisma.user.findUnique({
                where:{
                    id: receiverId
                },
                select:{
                    id: true,
                    username: true,
                    avatar: true
                }
            })
            chat.receiver = receiver;
        }

        res.status(200).json(chats);
    }catch(error){
        console.log(error)
        res.status(500).json({ message: "Failed to get chats"});
    }
})

router.put("/read/:id", authMiddleware, async(req, res) =>{
    console.log("Read chat")
    const userIdToken = req.userId;
    try{
        const chat = await prisma.chat.update({
            where:{
                id: req.params.id,
                userIDs:{
                    hasSome:[userIdToken]
                }
            },
            data:{
                seenBy:{
                    push:[userIdToken]
                }
            }
        })
        res.status(200).json(chat);
        console.log(chat)
    }catch(error){
        console.log(error)
        res.status(500).json({ message: "Failed to read chat"});
    }
})


router.get("/:id", authMiddleware, async(req, res) =>{
    console.log("Get chat endpoint");
    const userIdToken = req.userId;
    try{
        const chat = await prisma.chat.findUnique({
            where:{
                id: req.params.id,
                userIDs:{
                    hasSome:[userIdToken]
                }
            },
            include:{
                messages:{
                    orderBy:{
                        createdAt: 'asc'
                    }
                }
            }
        })
        await prisma.chat.update({
            where:{
                id: req.params.id
            },
            data:{
                seenBy:{
                    push:[userIdToken]
                }
            }
        })
        res.status(200).json(chat)
    }catch(error){
        console.log(error)
        res.status(500).json({ message: "Failed to get chat"});
    }
})

router.post("/", authMiddleware, async(req, res) =>{
    console.log("Add chat")
    const userIdToken = req.userId;
    try{
        const newChat = await prisma.chat.create({
            data:{
                userIDs: [userIdToken, req.body.receiverId]
            }
        })
        res.status(200).json(newChat);
    }catch(error){
        console.log(error)
        res.status(500).json({ message: "Failed to add chat"});
    }
})


export default router;