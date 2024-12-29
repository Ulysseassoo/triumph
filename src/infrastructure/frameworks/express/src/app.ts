import express, { Express, Request, Response } from "express";
import cors from 'cors';
import helmet from 'helmet';
import userRouter  from '../src/routes/user.route';
import authRouter from '../src/routes/auth.route';


const app: Express = express();

const corsOptions = {
  origin: process.env.APP_URL || '*',
  optionsSuccessStatus: 200,
  credentials: true,
};
app.set('trust proxy', 1);
app.use(express.json());
app.use(cors(corsOptions));
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);
app.use(authRouter);
app.use(userRouter);



export default app;