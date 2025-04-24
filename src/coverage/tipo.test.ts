import { Request, Response } from "express";
import * as TipoHandler from "../handlers/tipo.handlers";
import TipoRepository from "../repository/tipo.repository";

jest.mock("../repository/tipo.repository");

type findMockReturnType = {
    id: number,
    nome: string
};

const jestFindAllMock: findMockReturnType[] = [
    {id: 1, nome: "Palestra" }, 
    {id: 2, nome: "Mini-curso"},
];

const jestFailureFindAllMock: findMockReturnType[] = [];

const jestCreateMock: findMockReturnType = {
    id: 1, nome: "Palestra"
};

const req = {} as unknown as Request;
const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn()
} as unknown as Response;
const next = jest.fn();

describe("GET - FindAll", () => {
    it("should return 200 http status code and a message", async () => {
        (TipoRepository.getAll as jest.Mock).mockResolvedValue(
                jestFindAllMock
            );
        
        await TipoHandler.findAll(req, res, next);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(
            commonResponse(true, jestFindAllMock)
        );
        
    });

    it("should return 400 http status code and a message", async () => {
        (TipoRepository.getAll as jest.Mock) 
            .mockResolvedValue(
                jestFailureFindAllMock
            );

        await TipoHandler.findAll(req, res, next);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith(
            commonResponse(false, "Nenhum tipo encontrado.")
        );

    });
});

describe("POST - Create", () => {
    it("should return 201 http status code and a message", async () => {
        (TipoRepository.create as jest.Mock)
            .mockResolvedValue(
                jestCreateMock
            );
        const req = {
            body: {
                nome: "Palestra"
            }
        } as unknown as Request;

        await TipoHandler.create(req, res, next);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(
            commonResponse(true, jestCreateMock)
        );

    });

    it("should return 500 http status code", () => {
        const res = {} as Response;
        const nextErr = jest.fn((e) => console.log("NEXT CALLED WITH: ", e));

        (TipoRepository.create as jest.Mock)
            .mockRejectedValue(new Error("Cannot create 'Tipo'"));
        
        TipoHandler.create(req, res, nextErr);
        
        expect(nextErr).toHaveBeenCalled();
        expect(nextErr.mock.calls[0][0]).toBeInstanceOf(Error);
        expect(nextErr.mock.calls[0][0].message).toBe("Cannot create 'Tipo'");
    });
});


const commonResponse = (status: boolean, data: any) => { 
    return {status, data} 
}