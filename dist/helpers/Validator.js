"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ExceptionHandler_1 = __importDefault(require("../utils/ExceptionHandler"));
const HttpResponse_1 = __importDefault(require("./HttpResponse"));
class Validator {
    static RequestValidationError(payload) {
        return new ExceptionHandler_1.default("Request Validation Error", HttpResponse_1.default.HTTP_BAD_REQUEST, payload);
    }
}
exports.default = Validator;
