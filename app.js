import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import studentRoutes from "./routes/studentRoutes.js";

const PORT = process.env.PORT;
connectDB();
const app = express();
dotenv.config();
app.use(express.json());


app.use('/students', studentRoutes);


app.listen(PORT, ()=>{
    console.log(`http://localhost:${PORT}`);
})