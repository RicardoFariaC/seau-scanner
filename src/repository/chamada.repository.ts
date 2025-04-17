import { prisma } from "../database";
import { ChamadaModel } from "../model/chamada.model";
import Aluno from "./aluno.repository";

export default class Chamada {
    static getAll = async () => {
        return await prisma.chamada.findMany();
    }

    static getByRa = async (ra: string) => {
        return await prisma.chamada.findFirst({
            where: {
                aluno: {
                    matricula: {
                        equals: ra
                    }
                }
            },
            select: {
                aluno: {
                    select: {
                        id: true,
                        matricula: true,
                        turma: true
                    }
                },
                evento: {
                    select: {
                        nome: true,
                        data_periodo: true,
                        tipo: {
                            select: { 
                                nome: true
                            }
                        },
                        login: true
                    }
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
            select: {
                aluno: {
                    select: {
                        matricula: true,
                        turma: true,
                    }
                },
                evento: {
                    select: {
                        nome: true,
                        data_periodo: true,
                        tipo: {
                            select: {
                                nome: true,
                            }
                        },
                        login: true
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

        const chamada = await prisma.chamada
            .create({
                data: {
                    eventoId: data.eventoId,
                    alunoId: aluno.id,
                }
            });
        return chamada;
    }
}