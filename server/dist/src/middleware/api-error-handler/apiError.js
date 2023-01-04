"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ApiError {
    constructor(code, message) {
        this.code = code;
        this.message = message;
    }
    static badRequest(msg) {
        return new ApiError(400, msg);
    }
    static notFound(msg) {
        return new ApiError(404, msg);
    }
    static internalError(msg) {
        return new ApiError(500, msg);
    }
    static unauthorizedAccess(msg) {
        return new ApiError(401, msg);
    }
    static limitedAccess(msg) {
        return new ApiError(403, msg);
    }
}
exports.default = ApiError;
//# sourceMappingURL=apiError.js.map