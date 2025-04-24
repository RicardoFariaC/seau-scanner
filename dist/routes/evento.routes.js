"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const evento_repository_1 = __importDefault(require("../repository/evento.repository"));
const auth_middleware_1 = __importDefault(require("../middleware/auth.middleware"));
const auth_repository_1 = __importDefault(require("../repository/auth.repository"));
const AuthMiddlewareInstance = new auth_middleware_1.default(new auth_repository_1.default());
exports.router = (0, express_1.Router)();
exports.router.use(AuthMiddlewareInstance.authorize);
exports.router.get("/", async (req, res) => {
    const data = await evento_repository_1.default.getAll();
    if (data.length === 0)
        res.status(404).json({
            status: false,
            message: "Nenhum evento encontrado."
        });
    else
        res.status(200).json({ status: true, data });
});
exports.router.post("/", async (req, res) => {
    const newEvento = await evento_repository_1.default.create(req.body);
    res.status(201).json({ status: true, data: newEvento });
});
