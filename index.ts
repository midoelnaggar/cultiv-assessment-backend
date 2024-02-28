import { configDotenv } from 'dotenv';
import express from 'express';
import cors from "cors";
import userRoutes from './src/routes/user.routes';
import contactRouter from './src/routes/contact.routes';
import path from 'path';

configDotenv();
const app = express();

const apiRouter = express.Router();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", apiRouter);

apiRouter.use("/user", userRoutes)
apiRouter.use("/contact", contactRouter)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.listen({ port: process.env.PORT }, () =>
    console.log(`Server is running on http://localhost:${process.env.PORT}`)
);
