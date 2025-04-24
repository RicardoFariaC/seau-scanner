import { Router, Request, Response } from "express";
import Auth from "../repository/auth.repository";
import Evento from "../repository/evento.repository";

export const router = Router();

router.post("/login", async (req: Request, res: Response): Promise<any> => {
    try {
        const { login, senha } = req.body;
        const evento = await Evento.getByLogin(login);
        if(evento != null) {
            let data_limite = new Date(evento.data_periodo);
            let now = new Date();
            data_limite.setHours(data_limite.getHours() + 3, data_limite.getMinutes() + 40);

            if(data_limite.getTime() < now.getTime()){
                return res.send({ status: false, jwt: null, message: "O período de inscrição no evento terminou." });
            }

        }

        const { status, jwt } = await Auth.login(evento, senha);
        
        if(status) return res.status(200).send({ jwt });
        
        return res.send({ status: status, jwt: null, message: "O usuário/senha está incorreto ou não existe." });
    } catch(err) {
        console.log(err);
        return res.status(500).json({ message: "Erro ao buscar evento." });
    }
});

router.get("/profile", async (req: Request, res: Response): Promise<any> => {
    try {
        const token = req.body.token;

        const { status, payload } = await Auth.verifyToken(token);
        return res.send({payload});


    } catch(err) {

    }
});