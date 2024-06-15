import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './Config/dataBase.js';
import userRouter from './Routes/userRoute.js';
import cookieParser from 'cookie-parser';
import messageRouter from "./Routes/messageRoute.js"
import {app,server} from "./Socket/Socket.js"

dotenv.config({});

const corsOption ={
    origin:"http://localhost:3000",
    credentials:true
};
// Middleware
app.use(express.json()); 
app.use(cookieParser());
app.use(express.urlencoded({extended:true}))
app.use(cors(corsOption))

// Routes
app.use('/api/v1/user', userRouter);
app.use('/api/v1/message', messageRouter);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on port ${PORT}`);
});
