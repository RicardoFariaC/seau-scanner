import Auth from "../repository/auth.repository";
import { Request, Response, NextFunction } from "express";

export default class AuthMiddleware {
    auth: Auth;

    constructor(auth: Auth) {
        this.auth = auth;
    }

    async authorize(req: Request, res: Response, next: NextFunction):Promise<any> {
        try {
            const { authorization } = req.headers;
            if (!authorization) {
                return res.status(401).json({ message: "Não autorizado." });
            }
            
            const [bearer, token] = authorization.split(" ");
            if (bearer !== "Bearer") {
                return res.status(401).json({ message: "Não autorizado." });
            }

            const { status } = await Auth.verifyToken(token);
            if(!status) {
                return res.status(401).json({ message: "Não autorizado." });
            } 
            next();
        } catch(err) {
            return res.status(401).json({ message: "Erro interno." });
        }
    }

}