"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.asyncHandle = void 0;
const asyncHandle = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};
exports.asyncHandle = asyncHandle;
