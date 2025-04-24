"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const auth_repository_1 = __importDefault(require("../repository/auth.repository"));
const evento_repository_1 = __importDefault(require("../repository/evento.repository"));
exports.router = (0, express_1.Router)();
exports.router.post("/login", async (req, res) => {
    try {
        const { login, senha } = req.body;
        const evento = await evento_repository_1.default.getByLogin(login);
        if (evento != null) {
            let data_limite = new Date(evento.data_periodo);
            let now = new Date();
            data_limite.setHours(data_limite.getHours() + 3, data_limite.getMinutes() + 40);
            console.log(data_limite.toString());
            console.log(now.toString());
            if (data_limite.getTime() < now.getTime()) {
                return res.send({ status: false, jwt: null, message: "O período de inscrição no evento terminou." });
            }
        }
        const { status, jwt } = await auth_repository_1.default.login(evento, senha);
        if (status)
            return res.status(200).send({ jwt });
        return res.send({ status: status, jwt: null, message: "O usuário/senha está incorreto ou não existe." });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Erro ao buscar evento." });
    }
});
exports.router.get("/profile", async (req, res) => {
    try {
        const token = req.body.token;
        const { status, payload } = await auth_repository_1.default.verifyToken(token);
        return res.send({ payload });
    }
    catch (err) {
    }
});
