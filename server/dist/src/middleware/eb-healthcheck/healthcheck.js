"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const healthCheckMiddleware = (req, res, next) => {
    if (req.path === '/health') {
        return res.status(200).send('Instance is healthy');
    }
    return next();
};
exports.default = healthCheckMiddleware;
//# sourceMappingURL=healthcheck.js.map