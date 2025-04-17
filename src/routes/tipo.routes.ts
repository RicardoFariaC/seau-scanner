import { Request, Response, Router } from 'express';
import Tipo from '../repository/tipo.repository';
import AuthMiddleware from '../middleware/auth.middleware';
import Auth from '../repository/auth.repository';

const AuthMiddlewareInstance = new AuthMiddleware(new Auth());
export const router = Router();

router.use(AuthMiddlewareInstance.authorize);

router.get("/", async (req: Request, res: Response) => {
    const data = await Tipo.getAll();
    if(data.length === 0) res.status(404).json({ 
        status: false, 
        message: "Nenhum tipo encontrado." 
    });
    else res.status(200).json({ status: true, data })
});

router.post("/", async (req: Request, res: Response) => {
    const newTipo = await Tipo.create(req.body);
    res.status(201).json({ status: true, data: newTipo })
});