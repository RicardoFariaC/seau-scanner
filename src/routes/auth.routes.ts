import { Router, Request, Response } from "express";
import Auth from "../repository/auth.repository";
import Evento from "../repository/evento.repository";

export const router = Router();

router.post("/login", async (req: Request, res: Response): Promise<any> => {
    try {
        const { login, senha } = req.body;
        const evento = await Evento.getByLogin(login);
        const { status, jwt } = await Auth.login(evento, senha);
        
        if(status) return res.status(200).send({ jwt });
        
        return res.send({ status: status, jwt: null, message: "O usuário/senha está incorreto ou não existe." });
    } catch(err) {
        console.log(err);
        return res.status(500).json({ message: "Erro ao buscar evento." });
    }
});