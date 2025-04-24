"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../database");
class Aluno {
    static async getAll() {
        return await database_1.prisma.aluno.findMany();
    }
    static async getByMatricula(matricula) {
        return await database_1.prisma.aluno.findFirst({
            where: {
                matricula: { equals: matricula }
            }
        });
    }
    static async create(data) {
        return await database_1.prisma.aluno.create({
            data
        });
    }
}
exports.default = Aluno;
