"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_2 = require("express");
const evento_routes_1 = require("./routes/evento.routes");
const app = (0, express_1.default)();
const route = (0, express_2.Router)();
app.use(express_1.default.json());
route.get('/ping', (_, res) => {
    res.json({ message: "Pong @ univap.br" });
});
app.use(route);
app.use('/evento', evento_routes_1.router);
app.listen(5123, () => {
    'Server is running on port 3000';
});
