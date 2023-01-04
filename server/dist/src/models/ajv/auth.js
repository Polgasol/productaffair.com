"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ajvValidateAbout = exports.ajvValidateLike = exports.ajvValidateFollow = exports.ajvValidateGetCategories = exports.ajvValidatePostId = exports.ajvValidateSearch = exports.ajvValidatePages = exports.ajvValidateComments = exports.ajvValidateGoogleUsername = exports.ajvValidateUpload = exports.ajvValidateLogin = exports.ajvVerifyCode = exports.ajvValidateReg = void 0;
const instance_1 = __importDefault(require("./instance"));
const registerSchema = {
    type: 'object',
    properties: {
        firstname: {
            type: 'string',
            minLength: 1,
            maxLength: 100,
            pattern: '^(?=^.{1,100}$)[^s][a-zA-Zs]+[^s]$',
        },
        lastname: {
            type: 'string',
            minLength: 1,
            maxLength: 100,
            pattern: '^(?=^.{1,100}$)[^s][a-zA-Zs]+[^s]$',
        },
        age: { type: 'number', minimum: 13, maximum: 150 },
        email: {
            type: 'string',
            format: 'email',
            minLength: 3,
            maxLength: 500,
            pattern: `^([^@\\s]+)@((?:[-a-z0-9]+\\.)+[a-z]{2,500})$`,
        },
        username: {
            type: 'string',
            minLength: 1,
            maxLength: 100,
            pattern: '^(?=.{1,100}$)(?:[0-9a-zA-Zd]+(?:[_][0-9a-zA-Zd])*)+$',
        },
        createPassword: {
            type: 'string',
            format: 'password',
            minLength: 8,
            maxLength: 64,
            pattern: "(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*#?&^>;:~)(}{|'`+=<_-]).{8,64}$",
        },
        confirmPassword: {
            type: 'string',
            format: 'password',
            minLength: 8,
            maxLength: 64,
            pattern: "(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*#?&^>;:~)(}{|'`+=<_-]).{8,64}$",
        },
    },
    required: ['firstname', 'lastname', 'age', 'email', 'username', 'createPassword', 'confirmPassword'],
    additionalProperties: false,
    errorMessage: {
        properties: {
            firstname: '404',
            lastname: '404',
            age: '404',
            email: '404',
            username: '404',
            createPassword: '404',
            confirmPassword: '404',
        },
    },
};
const verifyCodeSchema = {
    type: 'object',
    properties: {
        verificationCode: {
            type: 'string',
            minLength: 8,
            maxLength: 8,
            pattern: '^(?=.{1,8}$)(?:[0-9a-zA-Zd]+(?:[0-9a-zA-Zd])*)+$',
        },
    },
    required: ['verificationCode'],
    additionalProperties: false,
    errorMessage: {
        properties: {
            verificationCode: '404',
        },
    },
};
const loginSchema = {
    type: 'object',
    properties: {
        username: {
            type: 'string',
            minLength: 1,
            maxLength: 100,
            pattern: '^(?=.{1,100}$)(?:[a-zA-Zd]+(?:[_][a-zA-Zd])*)+$',
        },
        password: {
            type: 'string',
            format: 'password',
            minLength: 6,
            maxLength: 64,
            pattern: "(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^>;:~)(}{|'`+=<_-]).{8,64}$",
        },
    },
    required: ['username', 'password'],
    additionalProperties: false,
    errorMessage: {
        properties: {
            username: '404',
            password: '404',
        },
    },
};
const uploadSchema = {
    type: 'object',
    properties: {
        title: {
            type: 'string',
            minLength: 1,
            maxLength: 100,
            pattern: '^[A-Za-z0-9+!?,.:;()@#s ]{1,100}$',
        },
        storeName: {
            type: 'string',
            minLength: 1,
            maxLength: 100,
            pattern: '^[A-Za-z0-9+!?,.:;()@#s ]{1,100}$',
        },
        ratings: {
            type: 'array',
            maxItems: 3,
            items: {
                type: 'object',
                properties: {
                    id: {
                        enum: [0, 1, 2],
                    },
                    label: {
                        enum: ['Quality', 'Price', 'Customer Service'],
                    },
                    score: {
                        enum: [1, 2, 3, 4, 5],
                    },
                },
            },
        },
        category: {
            enum: [
                'Technology',
                'Health and Wellness',
                "Men's Clothing",
                "Women's Clothing",
                'Travel',
                'Food and Drinks',
                'Kitchen',
                'Unique Items',
                'Home Improvement',
                'Sports and Recreation',
                'Nature',
                'Skin Care',
                'Baby',
                'Toys and Gaming',
                'Art and Design',
                'Pets',
                'Vehicle and Motors',
            ],
        },
    },
    required: ['title', 'storeName', 'ratings', 'category'],
    additionalProperties: false,
    errorMessage: {
        properties: {
            title: '404',
            storeName: '404',
            ratings: '404',
            category: '404',
        },
    },
};
const validateGoogleUsername = {
    type: 'object',
    properties: {
        googleUsername: {
            type: 'string',
            minLength: 1,
            maxLength: 100,
            pattern: '^(?=.{1,100}$)(?:[0-9a-zA-Zd]+(?:[_][0-9a-zA-Zd])*)+$',
        },
    },
    required: ['googleUsername'],
    additionalProperties: false,
    errorMessage: {
        properties: {
            googleUsername: '404',
        },
    },
};
const sanitizeComments = {
    type: 'object',
    properties: {
        commentText: {
            type: 'string',
            minLength: 1,
            maxLength: 500,
        },
    },
    required: ['commentText'],
    additionalProperties: false,
    errorMessage: {
        properties: {
            commentText: '404',
        },
    },
};
const pagesSchema = {
    type: 'object',
    properties: {
        page: {
            type: 'string',
            minLength: 1,
            maxLength: 5,
            pattern: '^[0-9]{1,5}$',
        },
    },
    required: ['page'],
    additionalProperties: false,
    errorMessage: {
        properties: {
            page: '404',
        },
    },
};
const searchSchema = {
    type: 'object',
    properties: {
        query: {
            type: 'string',
            minLength: 1,
            maxLength: 1000,
            pattern: `^[A-Za-z0-9+!?,.:;()@#\s ]{1,1000}$`,
        },
        page: {
            type: 'string',
            minLength: 1,
            maxLength: 5,
            pattern: '^[0-9]{1,5}$',
        },
    },
    required: ['query', 'page'],
    additionalProperties: false,
    errorMessage: {
        properties: {
            query: '404',
            page: '404',
        },
    },
};
const postIdSchema = {
    type: 'object',
    properties: {
        postId: {
            type: 'string',
            minLength: 1,
            maxLength: 1000000000000000,
            pattern: '^[0-9]{1,1000000000000000}$',
        },
    },
    required: ['postId'],
    additionalProperties: false,
    errorMessage: {
        properties: {
            postId: '404',
        },
    },
};
const getCategoriesSchema = {
    type: 'object',
    properties: {
        category: {
            enum: [
                'Technology',
                'Health and Wellness',
                "Men's Clothing",
                "Women's Clothing",
                'Travel',
                'Unique Items',
                'Food and Drinks',
                'Kitchen',
                'Home Improvement',
                'Sports and Recreation',
                'Nature',
                'Skin Care',
                'Baby',
                'Toys and Gaming',
                'Art and Design',
                'Pets',
                'Vehicle and Motors',
            ],
        },
        page: {
            type: 'string',
            minLength: 1,
            maxLength: 5,
            pattern: '^[0-9]{1,5}$',
        },
    },
    required: ['category', 'page'],
    additionalProperties: false,
    errorMessage: {
        properties: {
            category: '404',
            page: '404',
        },
    },
};
const userIdSchema = {
    type: 'object',
    properties: {
        userId: {
            type: 'string',
            minLength: 1,
            maxLength: 1000000000000000,
            pattern: '^[0-9]{1,1000000000000000}$',
        },
    },
    required: ['userId'],
    additionalProperties: false,
    errorMessage: {
        properties: {
            userId: '404',
        },
    },
};
const aboutSchema = {
    type: 'object',
    properties: {
        about: {
            type: 'string',
            minLength: 1,
            maxLength: 160,
            pattern: '^(?=.{1,100}$)[^s].*[^s]$',
        },
    },
    required: ['about'],
    additionalProperties: false,
    errorMessage: {
        properties: {
            about: '404',
        },
    },
};
const ajvValidateReg = instance_1.default.compile(registerSchema);
exports.ajvValidateReg = ajvValidateReg;
const ajvVerifyCode = instance_1.default.compile(verifyCodeSchema);
exports.ajvVerifyCode = ajvVerifyCode;
const ajvValidateLogin = instance_1.default.compile(loginSchema);
exports.ajvValidateLogin = ajvValidateLogin;
const ajvValidateUpload = instance_1.default.compile(uploadSchema);
exports.ajvValidateUpload = ajvValidateUpload;
const ajvValidatePages = instance_1.default.compile(pagesSchema);
exports.ajvValidatePages = ajvValidatePages;
const ajvValidateGoogleUsername = instance_1.default.compile(validateGoogleUsername);
exports.ajvValidateGoogleUsername = ajvValidateGoogleUsername;
const ajvValidateComments = instance_1.default.compile(sanitizeComments);
exports.ajvValidateComments = ajvValidateComments;
const ajvValidateSearch = instance_1.default.compile(searchSchema);
exports.ajvValidateSearch = ajvValidateSearch;
const ajvValidatePostId = instance_1.default.compile(postIdSchema);
exports.ajvValidatePostId = ajvValidatePostId;
const ajvValidateGetCategories = instance_1.default.compile(getCategoriesSchema);
exports.ajvValidateGetCategories = ajvValidateGetCategories;
const ajvValidateFollow = instance_1.default.compile(userIdSchema);
exports.ajvValidateFollow = ajvValidateFollow;
const ajvValidateLike = instance_1.default.compile(postIdSchema);
exports.ajvValidateLike = ajvValidateLike;
const ajvValidateAbout = instance_1.default.compile(aboutSchema);
exports.ajvValidateAbout = ajvValidateAbout;
//# sourceMappingURL=auth.js.map