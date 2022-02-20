import "reflect-metadata";
import { createConnection } from "typeorm";
import express from "express";
import morgan from "morgan";

import authRoutes from './routes/auth';

import trim from "./middleware/trim"

const app = express();
app.use(express.json())
app.use(morgan('dev'))
app.use(trim);

app.get('/', (req, res) => res.send("Hello world"))
app.use('/api/auth', authRoutes)

app.listen(3000, async () => {
    console.log("Server running at http://localsehost:3000")
    try {
        await createConnection()
        console.log("Database connection!")
    } catch (err) {
        console.log(err);

    }
})