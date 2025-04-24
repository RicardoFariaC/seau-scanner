"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../database");
const bcrypt_1 = __importDefault(require("bcrypt"));
class Evento {
}
_a = Evento;
Evento.getAll = async () => {
    return await database_1.prisma.evento.findMany();
};
Evento.getByLogin = async (login) => {
    return await database_1.prisma.evento.findFirst({
        where: {
            login: {
                equals: login
            },
        }
    });
};
Evento.getById = async (id) => {
    return await database_1.prisma.evento.findUnique({
        where: { id }
    });
};
Evento.create = async (data) => {
    const salt = bcrypt_1.default.genSaltSync(Number(process.env.SALT_ROUNDS) || 10);
    const hashedPassword = await bcrypt_1.default.hash(data.senha, salt);
    const { senha, ...evento } = await database_1.prisma.evento.create({
        data: {
            ...data,
            senha: hashedPassword
        }
    });
    return evento;
};
exports.default = Evento;
