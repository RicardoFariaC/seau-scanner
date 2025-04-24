"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ping = void 0;
const ping = (_, res) => {
    res.json({ message: "Pong @ univap.br" });
};
exports.ping = ping;
