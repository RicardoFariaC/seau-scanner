"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const express_2 = require("express");
const evento_routes_1 = require("./routes/evento.routes");
const tipo_routes_1 = require("./routes/tipo.routes");
const auth_routes_1 = require("./routes/auth.routes");
const chamada_routes_1 = require("./routes/chamada.routes");
const cors_1 = __importDefault(require("cors"));
const handler_1 = require("./handler");
exports.app = (0, express_1.default)();
const route = (0, express_2.Router)();
exports.app.use((0, cors_1.default)());
exports.app.use(express_1.default.urlencoded({ extended: true }));
exports.app.use(express_1.default.json());
route.get('/ping', handler_1.ping);
exports.app.use(route);
exports.app.use(auth_routes_1.router);
exports.app.use('/evento', evento_routes_1.router);
exports.app.use('/tipo', tipo_routes_1.router);
exports.app.use('/chamada', chamada_routes_1.router);
// app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
//     writeError(err);
//     res.status(500).json({ status: false, message: "Algo não saiu como esperado." })
// });
exports.app.listen(5123, () => {
    console.log('Server is running on port 5123');
});
