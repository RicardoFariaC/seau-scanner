import { Request, Response, Router } from 'express';
import AuthMiddleware from '../middleware/auth.middleware';
import Auth from '../repository/auth.repository';
import Aluno from '../repository/aluno.repository';

const AuthMiddlewareInstance = new AuthMiddleware(new Auth());
export const router = Router();

router.use(AuthMiddlewareInstance.authorize);

router.get("/", async (req: Request, res: Response) => {
    const data = await Aluno.getAll();
    if(data.length === 0) res.status(404).json({ 
        status: false, 
        message: "Nenhum aluno encontrado." 
    });
    else res.status(200).json({ status: true, data })
});

router.get("/:matricula", async (req: Request, res: Response) => {
    const matricula = req.params.matricula;
    const aluno = await Aluno.getByMatricula(matricula);
    
    if(!aluno) res.status(404).json({ status: false, message: "Aluno não encontrado." });
    else res.status(200).json({ status: true, data: aluno });
});

router.post("/", async (req: Request, res: Response) => {
    const newAluno = await Aluno.create(req.body);
    res.status(201).json({ status: true, data: newAluno })
});

