"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SuccessResponse {
    sendSuccessResponse(res, data, message, statusCode) {
        return res.status(200 || statusCode).json({
            status: 'success',
            data,
            message,
            statusCode
        });
    }
    ;
}
exports.default = SuccessResponse;
