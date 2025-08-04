import express from "express";
import dotenv from "dotenv";
const PORT = process.env.PORT;

const app = express();
dotenv.config();





app.listen(PORT, ()=>{
    console.log(`http://localhost:${PORT}`);
})