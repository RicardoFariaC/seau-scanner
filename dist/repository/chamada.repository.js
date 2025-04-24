"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../database");
const aluno_repository_1 = __importDefault(require("./aluno.repository"));
const evento_repository_1 = __importDefault(require("./evento.repository"));
class Chamada {
}
_a = Chamada;
Chamada.getAll = async () => {
    return await database_1.prisma.chamada.findMany();
};
Chamada.getByRa = async (ra) => {
    return await database_1.prisma.chamada.findFirst({
        where: { aluno: { matricula: { equals: ra } } },
        select: {
            aluno: {
                include: { chamada: { select: { evento: { omit: {
                                    senha: true, isAtivo: true,
                                } } } } }
            }
        }
    });
};
Chamada.getByTurma = async (turma) => {
    return await database_1.prisma.chamada.findMany({
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
};
Chamada.getByEvento = async (eventoId) => {
    return await database_1.prisma.chamada.findMany({
        where: {
            eventoId: {
                equals: eventoId
            }
        }
    });
};
Chamada.create = async (data) => {
    if (!data.aluno) {
        throw new Error("Aluno não informado.");
    }
    let aluno = await aluno_repository_1.default.getByMatricula(data.aluno.matricula);
    if (!aluno) {
        aluno = await database_1.prisma.aluno.create({
            data: {
                matricula: data.aluno.matricula,
                turma: data.aluno.turma
            }
        });
    }
    let [chamada, evento] = await Promise.all([
        _a.getByRa(aluno?.matricula),
        evento_repository_1.default.getById(data.eventoId)
    ]);
    let verificarChamada = chamada?.aluno.chamada;
    if (verificarChamada != undefined) {
        if (verificarChamada.find((ch) => ch.evento.id == data.eventoId)) {
            throw new Error("Aluno já está cadastrado na palestra.");
        }
        else if (verificarChamada.find((ch) => ch.evento.data_periodo.getTime() == evento.data_periodo.getTime())) {
            throw new Error("Aluno já cadastrado em uma palestra do mesmo período.");
        }
    }
    if (!evento?.isAtivo) {
        throw new Error("O período de inscrição do evento expirou.");
    }
    const confirmar = await database_1.prisma.chamada
        .create({
        data: {
            eventoId: data.eventoId,
            alunoId: aluno.id,
        }
    });
    return confirmar;
};
exports.default = Chamada;
