"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ajv_1 = __importDefault(require("ajv"));
const ajv_formats_1 = __importDefault(require("ajv-formats"));
const ajv_errors_1 = __importDefault(require("ajv-errors"));
const ajvInstance = new ajv_1.default({ allErrors: true });
(0, ajv_errors_1.default)((0, ajv_formats_1.default)(ajvInstance));
exports.default = ajvInstance;
//# sourceMappingURL=instance.js.map