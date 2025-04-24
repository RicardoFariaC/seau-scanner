import { prisma } from "../database";
import { ChamadaModel } from "../model/chamada.model";
import Aluno from "./aluno.repository";
import Evento from "./evento.repository";

export default class Chamada {
    static getAll = async () => {
        return await prisma.chamada.findMany();
    }

    static getByRa = async (ra: string) => {
        return await prisma.chamada.findFirst({
            where: { aluno: { matricula: { equals: ra } } },
            select: {
                aluno: {
                    include: { chamada: { select: { evento: { omit: {
                        senha:true, isAtivo:true,
                    } } } } }
                }
            }
        });
    }

    static getByTurma = async (turma: string) => {
        return await prisma.chamada.findMany({
            where: {
                aluno: {
                    turma: {
                        equals: turma
                    }
                }
            },
            orderBy: {
                eventoId: "asc"
            },
            select: {
                evento: {
                    omit: {
                        senha: true,
                        capacidade: true,
                    },
                    include: {
                        chamada: {
                            select: { aluno: true }
                        }
                    }
                }
            }
        });
    }

    static getByEvento = async (eventoId: number) => {
        return await prisma.chamada.findMany({
            where: {
                eventoId: {
                    equals: eventoId
                }
            }
        });
    }

    static create = async (data: ChamadaModel) => {
        if(!data.aluno) {
            throw new Error("Aluno não informado.");
        }

        let aluno = await Aluno.getByMatricula(data.aluno.matricula);
        
        if(!aluno) {
            aluno = await prisma.aluno.create({
                data: {
                    matricula: data.aluno!.matricula,
                    turma: data.aluno!.turma
                }
            });
        }

        
        let [chamada, evento] = await Promise.all([
            Chamada.getByRa(aluno?.matricula),
            Evento.getById(data.eventoId)
        ])

        let verificarChamada = chamada?.aluno.chamada;

        if(verificarChamada != undefined) {   
            if(verificarChamada!.find((ch) => ch.evento.id == data.eventoId))
            {
                throw new Error("Aluno já está cadastrado na palestra.");
            } else if(verificarChamada!.find((ch) => ch.evento.data_periodo.getTime() == evento!.data_periodo.getTime()))
            {
                throw new Error("Aluno já cadastrado em uma palestra do mesmo período.");
            }
        }

        if(!evento?.isAtivo) {
            throw new Error("O período de inscrição do evento expirou.");
        }

        const confirmar = await prisma.chamada
            .create({
                data: {
                    eventoId: data.eventoId,
                    alunoId: aluno.id,
                }
            });
            return confirmar;
    }
}