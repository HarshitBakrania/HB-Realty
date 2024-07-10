import express from "express"
import authRoute from "./routes/auth.js"
const PORT = 3000;

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World!")
})

app.use("/api/auth", authRoute);



app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})