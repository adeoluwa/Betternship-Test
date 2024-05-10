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
exports.UserController = void 0;
const User_1 = __importDefault(require("../models/User"));
const ExceptionHandler_1 = __importDefault(require("../utils/ExceptionHandler"));
const Validator_1 = __importDefault(require("../helpers/Validator"));
const customResponse_1 = __importDefault(require("../utils/customResponse"));
const helpers_1 = __importDefault(require("../helpers"));
const logger_1 = __importDefault(require("../utils/logger"));
const User_2 = require("../dtos/User");
const HttpResponse_1 = __importDefault(require("../helpers/HttpResponse"));
const customResponseMessage = new customResponse_1.default();
class UserController {
    constructor() {
        this.createUsers = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { error, value } = User_2.CreateUserProfileDto.validate(req.body);
                if (error) {
                    logger_1.default.error("Validation Error:", error.details.map((error) => error.message));
                }
                const user = yield User_1.default.create(value);
                console.log("User Profile: ", user);
                return customResponseMessage.sendSuccessResponse(res, user.toObject(), "User's Account Created", HttpResponse_1.default.HTTP_CREATED);
            }
            catch (error) {
                return next(error);
            }
        });
        this.userLogin = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { error, value } = User_2.UserSignInDto.validate(req.body);
                console.log(value.email);
                if (error) {
                    return next(Validator_1.default.RequestValidationError(error.details.map((error) => error.message)));
                }
                const user = yield User_1.default.findOne({ email: value.email }).select("-createdAt -updateAt");
                if (!user) {
                    return next(new ExceptionHandler_1.default("User not found", HttpResponse_1.default.HTTP_NOT_FOUND));
                }
                const isPasswordValid = helpers_1.default.correctPassword(value.password, user.password);
                if (!isPasswordValid) {
                    return next(new ExceptionHandler_1.default("Invalid credentials", HttpResponse_1.default.HTTP_BAD_REQUEST));
                }
                const { token } = helpers_1.default.signToken({
                    email: user === null || user === void 0 ? void 0 : user.email,
                    _id: user === null || user === void 0 ? void 0 : user._id,
                });
                return customResponseMessage.sendSuccessResponse(res, {
                    accessToken: token,
                    user: helpers_1.default.omitProperties(user.toObject(), "password"),
                }, "User Authenticated", HttpResponse_1.default.HTTP_OK);
            }
            catch (error) {
                return next(error);
            }
        });
        this.updateUserProfile = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.params.id;
                const { error, value } = User_2.UpdateUserProfileDto.validate(req.body);
                if (error) {
                    return next(Validator_1.default.RequestValidationError(error.details.map((error) => error.message)));
                }
                const user = yield User_1.default.findByIdAndUpdate(userId, value, { new: true });
                if (!user) {
                    return next(new ExceptionHandler_1.default("User not found", HttpResponse_1.default.HTTP_NOT_FOUND));
                }
                return customResponseMessage.sendSuccessResponse(res, user.toObject(), "User PRofile Updated Successfully", HttpResponse_1.default.HTTP_OK);
            }
            catch (error) {
                return next(error);
            }
        });
        this.listUserProfiles = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield User_1.default.find();
                if (users.length < 1) {
                    return next(new ExceptionHandler_1.default("No users Registered yet", HttpResponse_1.default.HTTP_NOT_FOUND));
                }
                const cleanedUserProfiles = users.map((user) => helpers_1.default.omitProperties(user.toObject(), "password"));
                return customResponseMessage.sendSuccessResponse(res, {
                    "Number of Users": users.length,
                    users: cleanedUserProfiles,
                }, "Users profiles retrieved", HttpResponse_1.default.HTTP_OK);
            }
            catch (error) {
                return next(error);
            }
        });
        this.getUserById = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.params.id;
                if (!userId) {
                    return next(new ExceptionHandler_1.default("User's ID is required", HttpResponse_1.default.HTTP_BAD_REQUEST));
                }
                const user = yield User_1.default.findById(userId);
                if (!user) {
                    return next(new ExceptionHandler_1.default("User's Profile not found", HttpResponse_1.default.HTTP_NOT_FOUND));
                }
                return customResponseMessage.sendSuccessResponse(res, {
                    user: helpers_1.default.omitProperties(user.toObject(), "password"),
                }, "User's profile retrieved", HttpResponse_1.default.HTTP_OK);
            }
            catch (error) {
                return next(error);
            }
        });
        this.deleteUserProfile = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.params.id;
                if (!userId) {
                    return next(new ExceptionHandler_1.default("User's ID is required", HttpResponse_1.default.HTTP_BAD_REQUEST));
                }
                const user = yield User_1.default.findByIdAndDelete(userId);
                if (!user) {
                    return next(new ExceptionHandler_1.default("User profile not found", HttpResponse_1.default.HTTP_NOT_FOUND));
                }
                return customResponseMessage.sendSuccessResponse(res, null, "user's profile deleted successfully", HttpResponse_1.default.HTTP_OK);
            }
            catch (error) {
                return next(error);
            }
        });
    }
}
exports.UserController = UserController;
