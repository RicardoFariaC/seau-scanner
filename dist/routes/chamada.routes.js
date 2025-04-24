"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const auth_middleware_1 = __importDefault(require("../middleware/auth.middleware"));
const auth_repository_1 = __importDefault(require("../repository/auth.repository"));
const chamada_repository_1 = __importDefault(require("../repository/chamada.repository"));
const jose_1 = require("jose");
const AuthMiddlewareInstance = new auth_middleware_1.default(new auth_repository_1.default());
exports.router = (0, express_1.Router)();
exports.router.use(AuthMiddlewareInstance.authorize);
exports.router.get("/", async (req, res) => {
    const data = await chamada_repository_1.default.getAll();
    if (data.length === 0)
        res.status(404).json({
            status: false,
            message: "Nenhuma chamada encontrada."
        });
    else
        res.status(200).json({ status: true, data });
});
exports.router.get("/:eventoId", async (req, res) => {
    const eventoId = Number(req.params.eventoId);
    const chamada = await chamada_repository_1.default.getByEvento(eventoId);
    if (!chamada)
        res.status(404).json({ status: false, message: "Chamada não encontrada." });
    else
        res.status(200).json({ status: true, data: chamada });
});
exports.router.get("/aluno/:ra", async (req, res) => {
    const ra = String(req.params.ra);
    const chamada = await chamada_repository_1.default.getByRa(ra);
    if (!chamada)
        res.status(404).json({ status: false, message: `Chamada do aluno ${ra} não encontrada.` });
    else
        res.status(200).json({ status: true, data: chamada });
});
exports.router.get("/turma/:turma", async (req, res) => {
    const turma = String(req.params.turma);
    const chamada = await chamada_repository_1.default.getByTurma(turma);
    if (!chamada)
        res.status(404).json({ status: false, message: `Chamada da turma ${turma} não encontrada.` });
    else
        res.status(200).json({ status: true, data: chamada });
});
exports.router.post("/", async (req, res) => {
    const { aluno } = req.body;
    const evento = req.headers.authorization;
    if (evento === undefined) {
        res.status(401).json({ status: false, message: "Token de autenticação não encontrado." });
        return;
    }
    const decodedToken = (0, jose_1.decodeJwt)(evento);
    const eventoId = decodedToken.evento.id;
    try {
        const chamada = await chamada_repository_1.default.create({ eventoId: eventoId, aluno: aluno });
        res.status(200).json({ status: true, data: chamada });
    }
    catch (err) {
        console.error(err);
        if (err instanceof Error) {
            res.status(400).json({ status: false, message: err.message });
        }
        else {
            res.status(400).json({ status: false, message: err });
        }
    }
});
