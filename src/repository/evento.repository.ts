import { prisma } from "../database";
import bcrypt from 'bcrypt';
import { EventoModel } from "../model/evento.model";

export default class Evento 
{
    static getAll = async () => {
        return await prisma.evento.findMany();
    }

    static getByLogin = async (login: string) => {
        return await prisma.evento.findFirst({
            where: {
                login: {
                    equals: login
                },
            }
        })
    }

    static getById = async (id: number) => {
        return await prisma.evento.findUnique({
            where: { id }
        });
    }

    static create = async (data: EventoModel) => {
        const salt = bcrypt.genSaltSync(Number(process.env.SALT_ROUNDS) || 10);
        const hashedPassword = await bcrypt.hash(data.senha, salt);
        const { senha, ...evento } = await prisma.evento.create({
            data: {
                ...data,
                senha: hashedPassword
            }
        });
        return evento;
    }
}