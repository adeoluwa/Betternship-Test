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
const mongoose_1 = __importDefault(require("mongoose"));
const logger_1 = __importDefault(require("../utils/logger"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
if (!process.env.DB_url) {
    logger_1.default.warning("DB_URL environment variable is not set");
}
const uri = process.env.DB_URL;
const connectDB = function () {
    return __awaiter(this, void 0, void 0, function* () {
        // if (!uri) {
        //   console.log("Database URI is not set");
        // }
        try {
            yield mongoose_1.default.connect(uri);
            logger_1.default.info("Database Module Connected");
        }
        catch (error) {
            logger_1.default.error("Database connection error: ", error);
        }
    });
};
exports.default = connectDB;
