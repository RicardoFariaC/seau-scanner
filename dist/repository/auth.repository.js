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
const bcrypt_1 = __importDefault(require("bcrypt"));
const jose = __importStar(require("jose"));
const secret = new TextEncoder().encode(process.env.SECRET);
class Auth {
    static async login(login, senha) {
        if (login == null)
            return { status: false, jwt: null };
        const match = await bcrypt_1.default.compare(senha, login.senha);
        if (!match)
            return { status: false, jwt: null };
        const jwt = await new jose.SignJWT({
            evento: { id: login.id, login: login.login }
        })
            .setProtectedHeader({ alg: process.env.ALGORITHM || 'HS256' })
            .setIssuedAt()
            .setExpirationTime(process.env.EXPIRATION_TIME || '30min')
            .sign(secret);
        return { status: match, jwt };
    }
    static async verifyToken(jwt) {
        try {
            const { payload } = await jose.jwtVerify(jwt, secret);
            return { status: true, payload };
        }
        catch (err) {
            return { status: false, payload: null };
        }
    }
}
exports.default = Auth;
