"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeError = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const writeError = (err) => {
    const timestamp = new Date().toISOString();
    fs_1.default.writeFile(path_1.default.resolve(__dirname, "../..", `errors/error.${timestamp}.log`), JSON.stringify({
        name: err.name,
        message: err.message,
    }), { flag: 'w' }, (error) => {
        if (error) {
            fs_1.default.writeFileSync(path_1.default.resolve(__dirname, "../..", `errors/error.critical.${timestamp}.log`), JSON.stringify({
                status: false,
                message: error
            }), { flag: 'w' });
        }
    });
};
exports.writeError = writeError;
