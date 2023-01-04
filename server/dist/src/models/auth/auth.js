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
const pool_1 = __importDefault(require("../../pool/pool"));
class Auth {
    static registerNonLocal(firstname, lastname, age, email, authType, verified) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = yield pool_1.default.query(`INSERT INTO users(username, firstname, lastname, age, email, auth_type, verified) VALUES($1,$2,$3,$4,$5,$6)`, [firstname, lastname, age, email, authType, verified]);
            return query;
        });
    }
    static registerLocal(username, firstname, lastname, age, password, email, authType, verified, about, profileImg) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield pool_1.default.query('BEGIN');
                yield pool_1.default.query(`INSERT INTO users(username, firstname, lastname, age, password, email, auth_type, verified, about, profile_img_url) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)`, [username, firstname, lastname, age, password, email, authType, verified, about, profileImg]);
                yield pool_1.default.query('COMMIT');
                return ['Success', null];
            }
            catch (_a) {
                yield pool_1.default.query('ROLLBACK');
                return [null, 'Error'];
            }
        });
    }
    static registerLocalPassword(password) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = yield pool_1.default.query('INSERT INTO users(password) VALUES($1)', [password]);
            return query;
        });
    }
    static registerUsername(username) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = yield pool_1.default.query('INSERT INTO users(username) VALUES($1)', [username]);
            return query;
        });
    }
    static updateVerified(username, verify) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = yield pool_1.default.query(`UPDATE users SET verified = $1 WHERE username = $2`, [verify, username]);
            return query;
        });
    }
}
exports.default = Auth;
//# sourceMappingURL=auth.js.map