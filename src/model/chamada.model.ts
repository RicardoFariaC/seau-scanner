export interface ChamadaModel {
    eventoId: number;
    alunoId?: number;
    aluno?: {
        matricula: string;
        turma: string;
    };
}