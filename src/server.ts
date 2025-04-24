import express, { NextFunction } from 'express';
import { Response, Request, Router } from 'express';
import { router as evento } from './routes/evento.routes';
import { router as tipo } from './routes/tipo.routes';
import { router as auth } from './routes/auth.routes';
import { router as chamada } from './routes/chamada.routes';
import cors from 'cors';
import { ping } from './handler';
import { writeError } from './utils/writeError.util';

export const app = express();
const route = Router();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

route.get('/ping', ping);

app.use(route);
app.use(auth);
app.use('/evento', evento);
app.use('/tipo', tipo);
app.use('/chamada', chamada);

// app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
//     writeError(err);
//     res.status(500).json({ status: false, message: "Algo não saiu como esperado." })
// });

app.listen(5123, () => {
    console.log('Server is running on port 5123')
});