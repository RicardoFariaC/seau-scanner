"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_repository_1 = __importDefault(require("../repository/auth.repository"));
class AuthMiddleware {
    constructor(auth) {
        this.auth = auth;
    }
    async authorize(req, res, next) {
        try {
            const { authorization } = req.headers;
            if (!authorization) {
                return res.status(401).json({ message: "Não autorizado." });
            }
            const [bearer, token] = authorization.split(" ");
            if (bearer !== "Bearer") {
                return res.status(401).json({ message: "Não autorizado." });
            }
            const { status } = await auth_repository_1.default.verifyToken(token);
            if (!status) {
                return res.status(401).json({ message: "Não autorizado." });
            }
            next();
        }
        catch (err) {
            return res.status(401).json({ message: "Erro interno." });
        }
    }
}
exports.default = AuthMiddleware;
