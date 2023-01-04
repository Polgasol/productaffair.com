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
class User {
    static createNewGoogleUser(firstname, lastname, googleId, authType, email) {
        return __awaiter(this, void 0, void 0, function* () {
            const newUser = yield pool_1.default.query(`INSERT INTO users(firstname,lastname,google_id,auth_type,email,verified) VALUES($1,$2,$3,$4,$5)`, [firstname, lastname, googleId, authType, email]);
            return newUser;
        });
    }
    static updateVerified(verified, email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield pool_1.default.query('BEGIN');
                yield pool_1.default.query(`UPDATE users SET verified=$1 WHERE email=$2`, [verified, email]);
                yield pool_1.default.query('COMMIT');
                return ['Success', null];
            }
            catch (e) {
                yield pool_1.default.query('ROLLBACK');
                return [null, 'Error'];
            }
        });
    }
    static updateUnverifiedUser(username, firstname, lastname, age, password, email, authType, verified, about, profileImg) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield pool_1.default.query('BEGIN');
                yield pool_1.default.query(`UPDATE users SET username=$1, firstname=$2, lastname=$3, age=$4, password=$5, email=$6, auth_type=$7, verified=$8, about=$9, profile_img_url=$10 WHERE email=$11`, [username, firstname, lastname, age, password, email, authType, verified, about, profileImg, email]);
                yield pool_1.default.query('COMMIT');
                return ['Success', null];
            }
            catch (e) {
                yield pool_1.default.query('ROLLBACK');
                return [null, 'Error'];
            }
        });
    }
    static userEmailVerified(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const userVerified = yield pool_1.default.query(`SELECT verified FROM users WHERE email = $1`, [email]);
            return userVerified;
        });
    }
    static googleVerified(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const userVerified = yield pool_1.default.query(`SELECT verified FROM users WHERE google_id = $1`, [id]);
            return userVerified;
        });
    }
    static userUsernameVerified(username) {
        return __awaiter(this, void 0, void 0, function* () {
            const userVerified = yield pool_1.default.query(`SELECT verified FROM users WHERE username = $1`, [username]);
            return userVerified;
        });
    }
    static googleUsername(username) {
        return __awaiter(this, void 0, void 0, function* () {
            const googleUsername = yield pool_1.default.query(`SELECT username FROM users WHERE username = $1`, [username]);
            return googleUsername;
        });
    }
    static googleId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const googleId = yield pool_1.default.query(`SELECT google_id FROM users WHERE google_id = $1`, [id]);
            return googleId;
        });
    }
    static googleEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const googleEmail = yield pool_1.default.query(`SELECT email FROM users WHERE email = $1`, [email]);
            return googleEmail;
        });
    }
    static localIdExist(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const localId = yield pool_1.default.query(`SELECT pk_users_id FROM users WHERE pk_users_id = $1`, [id]);
            return localId;
        });
    }
    static getUsernameByUsername(username) {
        return __awaiter(this, void 0, void 0, function* () {
            const userName = yield pool_1.default.query(`SELECT username FROM users WHERE username = $1`, [username]);
            return userName;
        });
    }
    static getEmailByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const userEmail = yield pool_1.default.query(`SELECT email FROM users WHERE email = $1`, [email]);
            return userEmail;
        });
    }
    static getUsernameByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const username = yield pool_1.default.query(`SELECT username FROM users WHERE email = $1`, [email]);
            return username;
        });
    }
    static getEmailByUsername(username) {
        return __awaiter(this, void 0, void 0, function* () {
            const email = yield pool_1.default.query(`SELECT email FROM users WHERE username = $1`, [username]);
            return email;
        });
    }
    static getPasswordByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const password = yield pool_1.default.query(`SELECT password FROM users WHERE email = $1`, [email]);
            return password;
        });
    }
    static getPasswordByUsername(username) {
        return __awaiter(this, void 0, void 0, function* () {
            const password = yield pool_1.default.query(`SELECT password FROM users WHERE username = $1`, [username]);
            return password;
        });
    }
    static passportDeserialize(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const password = yield pool_1.default.query(`SELECT password FROM users WHERE pk_users_id = $1`, [id]);
            return password;
        });
    }
    static getIdByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = yield pool_1.default.query(`SELECT pk_users_id FROM users WHERE email = $1`, [email]);
            return id;
        });
    }
    static getIdByUsername(username) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = yield pool_1.default.query(`SELECT pk_users_id FROM users WHERE username = $1`, [username]);
            return id;
        });
    }
    static getDateById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const date = yield pool_1.default.query(`SELECT date_created FROM users WHERE pk_users_id = $1`, [id]);
            return date;
        });
    }
}
exports.default = User;
//# sourceMappingURL=user.js.map