import express, {Application} from 'express';
import cors from 'cors';
import helmet from 'helmet';
import userRouter from './routes/user.route';
import authRouter from './routes/auth.route';


const app: Application = express();

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

app.use(userRouter);
app.use(authRouter);


export default app;