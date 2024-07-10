import bcrypt from "bcrypt";
import express from "express";

const router = express.Router();

router.post("/register", async(req,res) =>{
    const { username, email, password } = req.body;

    //TODO: HASH PASSWORD
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);

    res.send({
        message: "Register route"
    })
})

router.post("/login", (req,res) =>{
    console.log("login route")
})

router.post("/logout", (req,res) =>{
    console.log("logout route")
})

export default router