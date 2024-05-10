"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserProfileSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const helpers_1 = __importDefault(require("../helpers"));
exports.UserProfileSchema = new mongoose_1.default.Schema({
    username: {
        type: String,
        required: true,
    },
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    phone_number: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    address: {
        type: String,
    },
    password: {
        type: String,
        min: 6,
    },
});
exports.UserProfileSchema.pre("save", function (next) {
    if (!this.isModified("password"))
        return next();
    this.password = helpers_1.default.hash(this.password, 10);
    return next();
});
exports.default = mongoose_1.default.model("User", exports.UserProfileSchema);
