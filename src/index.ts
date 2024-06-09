import express, { ErrorRequestHandler } from 'express';
import 'dotenv/config';
import cors from 'cors';
import { getAppRoutes } from './routes';



const server = express();

server.use(cors());
server.use(express.json())

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    res.status(400);
    console.log(err);
    res.json({ error: 'Ocorreu algum erro.' });
}

server.use(errorHandler);

server.use(getAppRoutes())


server.listen(process.env.PORT, () => {
    console.log(`server running on port ${process.env.PORT}`)
});