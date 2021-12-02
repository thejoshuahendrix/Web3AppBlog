import express, { Express, Request, Response } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import helmet from 'helmet';
import router from './routes/index';
import cors from 'cors';
import bodyParser from 'body-parser';

dotenv.config();
const PORT = process.env.PORT || 5000;


const app: Express = express();
app.use(helmet());
app.use(cors());
app.use(express.json())
app.use("/api", router);

app.get('/', (req: Request, res: Response) => {
    res.send('Well done!');
})

app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`)
    mongoose.connect(process.env.MONGO_URI || "").then(() => {
        console.log("Connected to the database")
    }).catch((e: any) => {
        console.log("Error connecting to the DB")
        console.log(e.message)
    });
});
