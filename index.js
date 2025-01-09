import 'dotenv/config';
import express from "express";
import userRouter from './routes/user.router.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.listen(PORT)
app.use('/api/v1/users', userRouter);