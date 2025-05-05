export interface ChamadaModel {
    eventoId: number;
    alunoId?: number;
    aluno?: {
        matricula: string;
        nome: string;
        turma: string;
    };
}