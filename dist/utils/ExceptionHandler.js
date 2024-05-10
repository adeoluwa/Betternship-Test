"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ExceptionHandler extends Error {
    constructor(message, statusCode, error) {
        super(message);
        this.statusCode = statusCode || 400;
        this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
        this.error = error;
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.default = ExceptionHandler;
