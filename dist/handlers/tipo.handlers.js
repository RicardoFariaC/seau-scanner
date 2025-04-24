"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = exports.findAll = void 0;
const tipo_repository_1 = __importDefault(require("../repository/tipo.repository"));
const errorhandler_middleware_1 = require("../middleware/errorhandler.middleware");
exports.findAll = (0, errorhandler_middleware_1.asyncHandle)(async (req, res) => {
    const data = await tipo_repository_1.default.getAll();
    if (data.length === 0)
        res.status(404).json({
            status: false,
            data: "Nenhum tipo encontrado."
        });
    else
        res.status(200).json({ status: true, data });
});
exports.create = (0, errorhandler_middleware_1.asyncHandle)(async (req, res) => {
    const newTipo = await tipo_repository_1.default.create(req.body);
    res.status(201).json({ status: true, data: newTipo });
});
