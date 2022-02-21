import "reflect-metadata";
import { createConnection } from "typeorm";
import express from "express";
import morgan from "morgan";
import authRoutes from './routes/auth';
import postsRoutes from './routes/posts';
import subRoutes from './routes/subs';
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
dotenv.config();

import trim from "./middleware/trim"

const app = express();
const PORT = process.env.PORT;
app.use(express.json())
app.use(morgan('dev'))
app.use(trim);
app.use(cookieParser())

app.get('/', (_, res) => res.send("Hello world"))
app.use('/api/auth', authRoutes)
app.use('/api/posts', postsRoutes)
app.use('/api/subs', subRoutes)

app.listen(PORT, async () => {
    console.log(`Server running at http://localsehost:${PORT}`)
    try {
        await createConnection()
        console.log("Database connection!")
    } catch (err) {
        console.log(err);

    }
})