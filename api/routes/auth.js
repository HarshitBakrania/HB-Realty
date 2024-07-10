import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import express from "express";
import prisma from "../lib/prisma.js";

const router = express.Router();

router.post("/register", async(req,res) =>{
    const { username, email, password } = req.body;

    try{
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword
            }
        })
    
        res.send({
            message: "User created successfully"
        })
    }catch(error){
        console.log(error);
        res.status(500).json({
            message: "Failed to create User"
        })
    }

})

router.post("/login", async(req,res) =>{
    const { username, password } = req.body;

    try{
        const user = await prisma.user.findUnique({
            where: {
                username
            }
        })

        if(!user){
            return res.status(401).json({
                message: "Invalid credentials"
            })
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if(!isPasswordCorrect){
            return res.status(401).json({
                message: "Invalid credentials"
            })
        }

        const sessionAge = 1000 * 60 * 60 * 24 * 7;

        const token = jwt.sign({
            id: user.id
        }, process.env.JWT_SECRET,{expiresIn: sessionAge})

        res.cookie("authToken", token,{
            httpOnly: true,
            maxAge: sessionAge
        }).status(200).json({
            message: "Logged in successfully"
        })

    }catch(error){
        console.log(error);
        res.status(500).json({
            message: "Failed to login"
        })
    }

})

router.post("/logout", (req,res) =>{
    res.clearCookie("authToken").status(200).json({
        message: "Logged out successfully"
    })
   
})

export default router