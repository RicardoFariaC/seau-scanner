"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const TipoHandler = __importStar(require("../handlers/tipo.handlers"));
const tipo_repository_1 = __importDefault(require("../repository/tipo.repository"));
jest.mock("../repository/tipo.repository");
const jestFindAllMock = [
    { id: 1, nome: "Palestra" },
    { id: 2, nome: "Mini-curso" },
];
const jestFailureFindAllMock = [];
const jestCreateMock = {
    id: 1, nome: "Palestra"
};
const req = {};
const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn()
};
const next = jest.fn();
describe("GET - FindAll", () => {
    it("should return 200 http status code and a message", async () => {
        tipo_repository_1.default.getAll
            .mockResolvedValue(jestFindAllMock);
        await TipoHandler.findAll(req, res, next);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(commonResponse(true, jestFindAllMock));
    });
    it("should return 400 http status code and a message", async () => {
        tipo_repository_1.default.getAll
            .mockResolvedValue(jestFailureFindAllMock);
        await TipoHandler.findAll(req, res, next);
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith(commonResponse(false, "Nenhum tipo encontrado."));
    });
});
describe("POST - Create", () => {
    it("should return 201 http status code and a message", async () => {
        tipo_repository_1.default.create
            .mockResolvedValue(jestCreateMock);
        const req = {
            body: {
                nome: "Palestra"
            }
        };
        await TipoHandler.create(req, res, next);
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(commonResponse(true, jestCreateMock));
    });
    it("should return 500 http status code", () => {
        const res = {};
        const nextErr = jest.fn((e) => console.log("NEXT CALLED WITH: ", e));
        tipo_repository_1.default.create
            .mockRejectedValue(new Error("Cannot create 'Tipo'"));
        TipoHandler.create(req, res, nextErr);
        expect(nextErr).toHaveBeenCalled();
        expect(nextErr.mock.calls[0][0]).toBeInstanceOf(Error);
        expect(nextErr.mock.calls[0][0].message).toBe("Cannot create 'Tipo'");
    });
});
const commonResponse = (status, data) => {
    return { status, data };
};
