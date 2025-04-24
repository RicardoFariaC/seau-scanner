"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handler_1 = require("../handler");
describe("HEALTHY CHECK - PING HANDLER", () => {
    it("should return pong with 200 status code", () => {
        const req = {};
        const res = {
            json: jest.fn(),
        };
        (0, handler_1.ping)(req, res);
        expect(res.json).toHaveBeenCalledWith({ message: "Pong @ univap.br" });
    });
});
