import { prisma } from "../database";
import { TipoModel } from "../model/tipo.model";

export default class Tipo {
    static getAll = async () => {
        return await prisma.tipo.findMany();
    }

    static create = async (data: TipoModel) => {
        return await prisma.tipo.create({
            data
        });
    }

    static delete = async (id: number) => {
        return await prisma.tipo.delete({
            where: {
                id
            }
        });
    }
}