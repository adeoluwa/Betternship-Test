"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class Helper {
    static signToken(payload) {
        const token = jsonwebtoken_1.default.sign(payload, process.env.APP_KEY, {
            expiresIn: process.env.JWT_EXPIRES_IN,
        });
        return { token };
    }
    static verifyToken(payload) {
        const token = jsonwebtoken_1.default.verify(payload, process.env.APP_KEY);
        return { token };
    }
    static hash(value, saltValue = 10) {
        return bcryptjs_1.default.hashSync(value, saltValue);
    }
    static correctPassword(inputPassword, userPassword) {
        return bcryptjs_1.default.compareSync(inputPassword, userPassword);
    }
    static omitProperties(obj, ...propsToOmit) {
        const result = Object.assign({}, obj);
        propsToOmit.forEach((prop) => {
            delete result[prop];
        });
        return result;
    }
}
exports.default = Helper;
