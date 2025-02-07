import express, { Express, Request, Response } from "express";
import cors from 'cors';
import dotenv from "dotenv";
import userRouter  from "./routes/user.route";
import authRouter  from "./routes/auth.route";
dotenv.config();
const app: Express = express();

const corsOptions = {
  origin: process.env.APP_URL || '*',
  credentials: true,
};
app.use(cors(corsOptions));
app.set('trust proxy', 1);
app.use(express.json());


app.use(userRouter)
app.use(authRouter)
export default app;