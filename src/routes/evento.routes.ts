import { Request, Response, Router } from 'express';
import Evento from '../repository/evento.repository';
import AuthMiddleware from '../middleware/auth.middleware';
import Auth from '../repository/auth.repository';

const AuthMiddlewareInstance = new AuthMiddleware(new Auth());
export const router = Router();


router.use(AuthMiddlewareInstance.authorize);

router.get("/", async (req: Request, res: Response) => {
    const data = await Evento.getAll()
    if(data.length === 0) res.status(404).json({ 
        status: false, 
        message: "Nenhum evento encontrado." 
    });
    else res.status(200).json({ status: true, data })
});

router.post("/", async (req: Request, res: Response) => {
    const newEvento = await Evento.create(req.body);
    res.status(201).json({ status: true, data: newEvento })
});