import express from 'express';
import { Response, Request, Router } from 'express';
import { router as evento } from './routes/evento.routes';
import { router as tipo } from './routes/tipo.routes';
import { router as auth } from './routes/auth.routes';
import { router as chamada } from './routes/chamada.routes';
import cors from 'cors';

const app = express();
const route = Router();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

route.get('/ping', (_: Request, res: Response) => {
    res.json({ message: "Pong @ univap.br" })
});

app.use(route);
app.use(auth);
app.use('/evento', evento);
app.use('/tipo', tipo);
app.use('/chamada', chamada);

app.listen(5123, () => {
    console.log('Server is running on port 5123')
});