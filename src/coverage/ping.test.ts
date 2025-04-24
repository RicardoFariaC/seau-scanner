import { ping } from "../handler";
import { Request, Response } from "express";

describe("HEALTHY CHECK - PING HANDLER", () => {
    it("should return pong with 200 status code", () => {
        const req = {} as unknown as Request;
        const res = {
            json: jest.fn(),
        } as unknown as Response;
        
        ping(req, res);

        expect(res.json).toHaveBeenCalledWith({ message: "Pong @ univap.br" });
    });
});