import { prisma } from "../database";
import { AlunoModel } from "../model/aluno.model";

export default class Aluno {
    static async getAll() {
        return await prisma.aluno.findMany();
    }

    static async getByMatricula(matricula: string) {
        return await prisma.aluno.findFirst({
            where: {
                matricula: { equals: matricula }
            }
        });
    }

    static async create(data: AlunoModel) {
        return await prisma.aluno.create({
            data
        });
    }
}