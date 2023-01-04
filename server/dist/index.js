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
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const body_parser_1 = __importDefault(require("body-parser"));
const dayjs_1 = __importDefault(require("dayjs"));
const nanoid_1 = require("nanoid");
const timezone_1 = __importDefault(require("dayjs/plugin/timezone"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const redis_1 = require("redis");
const is_online_1 = __importDefault(require("is-online"));
const pool_1 = __importDefault(require("./src/pool/pool"));
const index_1 = __importDefault(require("./src/routes/index"));
const errorHandler_1 = __importDefault(require("./src/middleware/api-error-handler/errorHandler"));
const session_1 = __importDefault(require("./src/middleware/session/session"));
const redis_2 = __importDefault(require("./src/models/redis/redis"));
const cors_1 = __importDefault(require("./src/middleware/cors/cors"));
const logger_1 = __importDefault(require("./src/logger"));
const config_1 = __importDefault(require("./src/config/config"));
const apiError_1 = __importDefault(require("./src/middleware/api-error-handler/apiError"));
dotenv_1.default.config();
require('./src/config/passport-google');
require('./src/config/passport-local-login');
require('./src/config/passport-local-register');
const PORT = config_1.default.server.port;
const server = (0, express_1.default)();
try {
    (() => __awaiter(void 0, void 0, void 0, function* () {
        redis_2.default.on('connect', () => logger_1.default.info('Redis is connected'));
        redis_2.default.on('ready', () => logger_1.default.info('Redis is now ready'));
        redis_2.default.on('error', (err) => {
            if (err)
                process.exit(5);
        });
        yield redis_2.default.connect();
    }))();
    (() => __awaiter(void 0, void 0, void 0, function* () {
        pool_1.default.connect((err, client, done) => {
            if (err)
                process.exit(5);
            logger_1.default.info('Postgres Connected');
            done();
        });
    }))();
    server.options('*', cors_1.default);
    server.use(cors_1.default);
    server.set('trust proxy', true);
    server.use((0, cookie_parser_1.default)());
    server.use(body_parser_1.default.urlencoded({ extended: true }));
    server.use(express_1.default.urlencoded({ extended: true }));
    server.use(express_1.default.json());
    server.use((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const connected = yield (0, is_online_1.default)();
            if (!connected) {
                return next(apiError_1.default.internalError('Network Error'));
            }
            return next();
        }
        catch (err) {
            return next(apiError_1.default.internalError('Network Error'));
        }
    }));
    server.use((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const identifierIfRedisIsNotEmptyKey = yield redis_2.default.v4.hGet('doNotDeleteSpecialKey', 'id').catch(() => {
                return next(apiError_1.default.internalError('Error'));
            });
            if (!identifierIfRedisIsNotEmptyKey) {
                const setKey = yield redis_2.default.v4.hSet('doNotDeleteSpecialKey', 'id', '01-DO-NOT-DELETE-THIS-IDENTIFIER-KEY');
                const getDbPostsData = yield pool_1.default.query(`SELECT * FROM posts`).catch(() => {
                    return next(apiError_1.default.internalError('Error'));
                });
                const getDbUsersData = yield pool_1.default.query(`SELECT * FROM users`).catch(() => {
                    return next(apiError_1.default.internalError('Error'));
                });
                const getDbImagesData = yield pool_1.default.query(`SELECT * FROM images`).catch(() => {
                    return next(apiError_1.default.internalError('Error'));
                });
                const copyDataToRedis = (data) => {
                    return {
                        copyPosts: () => __awaiter(void 0, void 0, void 0, function* () {
                            for (let i = 0; i < data.rows.length; i += 1) {
                                yield redis_2.default.v4
                                    .hSet(`post:${JSON.stringify(data.rows[i].pk_post_id)}`, {
                                    id: JSON.stringify(data.rows[i].pk_post_id),
                                    user_id: JSON.stringify(data.rows[i].fk_users_id),
                                    author: JSON.stringify(data.rows[i].author),
                                    title: JSON.stringify(data.rows[i].title),
                                    store_name: JSON.stringify(data.rows[i].store_name),
                                    overall_rating: JSON.stringify(data.rows[i].overall_product_rating),
                                    quality: JSON.stringify(data.rows[i].quality),
                                    price: JSON.stringify(data.rows[i].price),
                                    customer_service: JSON.stringify(data.rows[i].customer_service),
                                    likes_count: JSON.stringify(data.rows[i].likes_count),
                                    views_count: JSON.stringify(data.rows[i].views_count),
                                    category: JSON.stringify(data.rows[i].category),
                                    comments_count: JSON.stringify(data.rows[i].comments_count),
                                    date_created: JSON.stringify(data.rows[i].date_created),
                                })
                                    .catch(() => {
                                    return next(apiError_1.default.internalError('Error'));
                                });
                            }
                        }),
                        copyUsers: () => __awaiter(void 0, void 0, void 0, function* () {
                            for (let i = 0; i < data.rows.length; i += 1) {
                                yield redis_2.default.v4
                                    .hSet(`user:${JSON.stringify(data.rows[i].pk_users_id)}`, {
                                    id: JSON.stringify(data.rows[i].pk_users_id),
                                    username: JSON.stringify(data.rows[i].username),
                                    profile_img_src: JSON.stringify(data.rows[i].profile_img_url),
                                    about: JSON.stringify(data.rows[i].about),
                                    total_likes: JSON.stringify(data.rows[i].total_likes),
                                    total_views: JSON.stringify(data.rows[i].total_views),
                                    post_count: JSON.stringify(data.rows[i].post_count),
                                    total_followers: JSON.stringify(data.rows[i].followers_count),
                                    total_following: JSON.stringify(data.rows[i].following_count),
                                    data_created: JSON.stringify(data.rows[i].date_created),
                                })
                                    .catch(() => {
                                    return next(apiError_1.default.internalError('Error'));
                                });
                            }
                        }),
                        copyImages: () => __awaiter(void 0, void 0, void 0, function* () {
                            for (let i = 0; i < data.rows.length; i += 1) {
                                yield redis_2.default.v4
                                    .hSet(`images:${JSON.stringify(data.rows[i].fk_post_id)}`, JSON.stringify(data.rows[i].image_url), JSON.stringify(data.rows[i].image_url))
                                    .catch(() => {
                                    return next(apiError_1.default.internalError('Error'));
                                });
                            }
                        }),
                    };
                };
                if (setKey && getDbPostsData && getDbUsersData && getDbImagesData) {
                    const onSuccess = yield Promise.all([
                        yield copyDataToRedis(getDbPostsData).copyPosts(),
                        yield copyDataToRedis(getDbUsersData).copyUsers(),
                        yield copyDataToRedis(getDbImagesData).copyImages(),
                    ]);
                    if (onSuccess) {
                        return next();
                    }
                    return next(apiError_1.default.internalError('Error'));
                }
                return next(apiError_1.default.internalError('Error'));
            }
            return next();
        }
        catch (err) {
            return next(apiError_1.default.internalError('Error'));
        }
    }));
    server.use((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const checkIfPostsIndexExist = yield redis_2.default.ft._list().catch(() => {
            return next(apiError_1.default.internalError('Error'));
        });
        const findPostIndex = checkIfPostsIndexExist.find((element) => element === 'posts:index');
        if (!findPostIndex) {
            yield redis_2.default.ft
                .create('posts:index', {
                id: {
                    type: redis_1.SchemaFieldTypes.TEXT,
                },
                user_id: {
                    type: redis_1.SchemaFieldTypes.TEXT,
                },
                author: {
                    type: redis_1.SchemaFieldTypes.TEXT,
                },
                title: {
                    type: redis_1.SchemaFieldTypes.TEXT,
                },
                store_name: {
                    type: redis_1.SchemaFieldTypes.TEXT,
                },
                overall_rating: {
                    type: redis_1.SchemaFieldTypes.TEXT,
                },
                quality: {
                    type: redis_1.SchemaFieldTypes.TEXT,
                },
                price: {
                    type: redis_1.SchemaFieldTypes.TEXT,
                },
                customer_service: {
                    type: redis_1.SchemaFieldTypes.TEXT,
                },
                likes_count: {
                    type: redis_1.SchemaFieldTypes.TEXT,
                },
                views_count: {
                    type: redis_1.SchemaFieldTypes.TEXT,
                },
                category: {
                    type: redis_1.SchemaFieldTypes.TEXT,
                },
                comments_count: {
                    type: redis_1.SchemaFieldTypes.TEXT,
                },
                date_created: {
                    type: redis_1.SchemaFieldTypes.TEXT,
                },
            }, {
                ON: 'HASH',
                PREFIX: 'post:',
            })
                .catch(() => {
                return next(apiError_1.default.internalError('Error'));
            });
            return next();
        }
        return next();
    }));
    server.use((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const checkIfUsersIndexExist = yield redis_2.default.ft._list().catch(() => {
            return next(apiError_1.default.internalError('Error'));
        });
        const findUserIndex = checkIfUsersIndexExist.find((element) => element === 'users:index');
        if (!findUserIndex) {
            yield redis_2.default.ft
                .create('users:index', {
                id: {
                    type: redis_1.SchemaFieldTypes.TEXT,
                },
                username: {
                    type: redis_1.SchemaFieldTypes.TEXT,
                },
                profile_img_src: {
                    type: redis_1.SchemaFieldTypes.TEXT,
                },
                about: {
                    type: redis_1.SchemaFieldTypes.TEXT,
                },
                total_likes: {
                    type: redis_1.SchemaFieldTypes.TEXT,
                },
                total_views: {
                    type: redis_1.SchemaFieldTypes.TEXT,
                },
                post_count: {
                    type: redis_1.SchemaFieldTypes.TEXT,
                },
                total_followers: {
                    type: redis_1.SchemaFieldTypes.TEXT,
                },
                total_following: {
                    type: redis_1.SchemaFieldTypes.TEXT,
                },
                date_created: {
                    type: redis_1.SchemaFieldTypes.TEXT,
                },
            }, {
                ON: 'HASH',
                PREFIX: 'user:',
            })
                .catch(() => {
                return next(apiError_1.default.internalError('Error'));
            });
            return next();
        }
        return next();
    }));
    server.use(session_1.default);
    server.use(passport_1.default.initialize());
    server.use(passport_1.default.session());
    server.use((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        if (req.user) {
            if (req.session.guestuser) {
                delete req.session.guestuser;
                return req.session.save((err) => {
                    if (err)
                        return next(apiError_1.default.internalError('Error'));
                    return next();
                });
            }
            return next();
        }
        if (req.session.guestuser) {
            return next();
        }
        dayjs_1.default.extend(timezone_1.default);
        const tz = dayjs_1.default.tz.guess();
        const createGuestId = (0, nanoid_1.customAlphabet)('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz', 100);
        req.session.guestuser = {
            guestId: createGuestId(),
            guest: true,
            tz,
            verified: false,
            type: 'guest',
        };
        return req.session.save((err) => {
            if (err) {
                return next(apiError_1.default.internalError('Error'));
            }
            return next();
        });
    }));
    server.use('/api', index_1.default);
    server.get('*', (req, res, next) => {
        next(apiError_1.default.notFound('Not Found'));
    });
    server.use(errorHandler_1.default);
    server.listen(PORT);
}
catch (err) {
    process.exit(5);
}
//# sourceMappingURL=index.js.map