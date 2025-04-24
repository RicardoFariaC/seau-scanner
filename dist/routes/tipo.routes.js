"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const auth_middleware_1 = __importDefault(require("../middleware/auth.middleware"));
const auth_repository_1 = __importDefault(require("../repository/auth.repository"));
const tipo_handlers_1 = require("../handlers/tipo.handlers");
const AuthMiddlewareInstance = new auth_middleware_1.default(new auth_repository_1.default());
exports.router = (0, express_1.Router)();
exports.router.use(AuthMiddlewareInstance.authorize);
exports.router.get("/", tipo_handlers_1.findAll);
exports.router.post("/", tipo_handlers_1.create);
