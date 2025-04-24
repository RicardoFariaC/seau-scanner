"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../database");
class Tipo {
}
_a = Tipo;
Tipo.getAll = async () => {
    return await database_1.prisma.tipo.findMany();
};
Tipo.create = async (data) => {
    return await database_1.prisma.tipo.create({
        data
    });
};
Tipo.delete = async (id) => {
    return await database_1.prisma.tipo.delete({
        where: {
            id
        }
    });
};
exports.default = Tipo;
