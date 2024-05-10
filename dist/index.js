"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const db_1 = __importDefault(require("./db"));
const index_1 = __importDefault(require("./routes/index"));
const logger_1 = __importDefault(require("./utils/logger"));
const logEndpoints_middleware_1 = __importDefault(require("./middleware/logEndpoints.middleware"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// Initialize MongoDB Connection
(0, db_1.default)();
const PORT = process.env.PORT || 4001;
const CorsOption = {
    origin: [`http://localhost:${PORT}`],
    optionalSuccessStatus: 200,
    credentials: true,
};
app.use(express_1.default.json({ limit: "50mb" }));
app.use(express_1.default.urlencoded({ limit: "50mb", extended: true }));
app.use((0, cors_1.default)(CorsOption));
app.use(logEndpoints_middleware_1.default);
app.get("/", (req, res, next) => {
    return res.status(200).json({
        message: "Welcome to Betternship Apititude Test API",
    });
});
app.use("/api/v1", index_1.default);
app.listen(PORT, () => {
    logger_1.default.info(`ServerRunning on Port http://localhost:${PORT}`);
});
