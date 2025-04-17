export interface EventoModel {
    id?: number;
    nome: string;
    data_periodo: Date;
    ocupacao?: number;
    login: string;
    senha: string;
    tipoId: number;
}