"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserProfileDto = exports.UserSignInDto = exports.CreateUserProfileDto = void 0;
const joi_1 = __importDefault(require("joi"));
exports.CreateUserProfileDto = joi_1.default.object({
    username: joi_1.default.string().required(),
    first_name: joi_1.default.string().required(),
    last_name: joi_1.default.string().required(),
    phone_number: joi_1.default.string().required(),
    address: joi_1.default.string().required(),
    email: joi_1.default.string().lowercase().required(),
    password: joi_1.default.string().required(),
}).options({ abortEarly: false });
exports.UserSignInDto = joi_1.default.object({
    email: joi_1.default.string().email().lowercase().required(),
    password: joi_1.default.string().required(),
}).options({ abortEarly: false });
exports.UpdateUserProfileDto = joi_1.default.object({
    username: joi_1.default.string().optional(),
    first_name: joi_1.default.string().optional(),
    last_name: joi_1.default.string().optional(),
    phone_number: joi_1.default.string().optional(),
    address: joi_1.default.string().optional(),
}).options({ abortEarly: false });
