"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAuthGuard = void 0;
const ExceptionHandler_1 = __importDefault(require("../utils/ExceptionHandler"));
const helpers_1 = __importDefault(require("../helpers"));
const User_1 = __importDefault(require("../models/User"));
const HttpResponse_1 = __importDefault(require("../helpers/HttpResponse"));
class UserAuthGuard {
    static authenticate(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const token = (_a = req.headers["authorization"]) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
                if (!token) {
                    return next(new ExceptionHandler_1.default("Unauthorized Access", 401));
                }
                const verifiedToken = helpers_1.default.verifyToken(token);
                const user = yield User_1.default.findOne({
                    email: verifiedToken.token.email,
                });
                if (!user) {
                    return next(new ExceptionHandler_1.default("Forbidden Access", HttpResponse_1.default.HTTP_FORBIDDEN));
                }
                req.user = user;
            }
            catch (error) {
                return next(error);
            }
        });
    }
}
exports.UserAuthGuard = UserAuthGuard;
