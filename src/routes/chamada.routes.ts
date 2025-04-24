import { Request, Response, Router } from "express";
import AuthMiddleware from "../middleware/auth.middleware";
import Auth from "../repository/auth.repository";
import Chamada from "../repository/chamada.repository";
import { decodeJwt } from "jose";

const AuthMiddlewareInstance = new AuthMiddleware(new Auth())
export const router = Router();


router.get("/", async (req: Request, res: Response) => {
    const data = await Chamada.getAll();
    if(data.length === 0) res.status(404).json({ 
        status: false, 
        message: "Nenhuma chamada encontrada." 
    });
    else res.status(200).json({ status: true, data })
});

router.get("/:eventoId", async (req: Request, res: Response) => {
    const eventoId = Number(req.params.eventoId);
    const chamada = await Chamada.getByEvento(eventoId);
    
    if(!chamada) res.status(404).json({ status: false, message: "Chamada não encontrada." });
    else res.status(200).json({ status: true, data: chamada });
});

router.get("/aluno/:ra", async (req: Request, res: Response) => {
    const ra = String(req.params.ra);
    const chamada = await Chamada.getByRa(ra);

    if(!chamada) res.status(404).json({ status: false, message: `Chamada do aluno ${ra} não encontrada.` });
    else res.status(200).json({ status: true, data: chamada });
});

router.get("/turma/:turma", async (req: Request, res: Response) => {
    const turma = String(req.params.turma);
    const chamada = await Chamada.getByTurma(turma);
    if(!chamada) res.status(404).json({ status: false, message: `Chamada da turma ${turma} não encontrada.` });
    else res.status(200).json({ status: true, data: chamada });
});

router.post("/", async (req: Request, res: Response) => {
    const { aluno } = req.body;
    const evento = req.headers.authorization;

    if(evento === undefined) {
        res.status(401).json({ status: false, message: "Token de autenticação não encontrado." });
        return;
    } 
    
    const decodedToken = decodeJwt(evento) as { evento: { id: number } };
    const eventoId = decodedToken.evento.id;

    try 
    {
        const chamada = await Chamada.create({eventoId: eventoId, aluno: aluno});
        res.status(200).json({ status: true, data: chamada });
    } catch(err)
    {
        console.error(err);

        if(err instanceof Error)
        {
            res.status(400).json({ status: false, message: err.message });
        } else 
        {
            res.status(400).json({ status: false, message: err });
        }
    }

});