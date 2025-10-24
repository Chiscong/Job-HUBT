import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import routes from './routes/index.routes';
import { connectDB } from './config/database.config';
import cookieParser from 'cookie-parser';
// Load environment variables from .env file
dotenv.config();
connectDB();
const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cors({
    origin: `${process.env.BACKEND_URL}`,
    credentials: true,
}));
app.use(cookieParser());
app.use('/',routes)
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});