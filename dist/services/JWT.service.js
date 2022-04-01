"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const http_errors_1 = __importDefault(require("http-errors"));
const moment_1 = __importDefault(require("moment"));
const typedi_1 = require("typedi");
let JWTManager = class JWTManager {
    constructor(redisClientManager, userService) {
        this.redisClientManager = redisClientManager;
        this.userService = userService;
        this.signToken = (userID) => {
            const privateKey = fs_1.default.readFileSync(path_1.default.join("dist/keys", "gontche_private.pem"), "utf-8");
            const payload = {};
            const options = {
                audience: String(userID),
                expiresIn: "1d",
                algorithm: "RS256",
            };
            return new Promise((resolve, reject) => {
                jsonwebtoken_1.default.sign(payload, privateKey, options, (err, accessToken) => {
                    if (err) {
                        reject(new http_errors_1.default.InternalServerError());
                    }
                    resolve({ accessToken, expiresIn: (0, moment_1.default)().add(1, "days").unix() });
                });
            });
        };
        this.verifyAccessToken = (req, res, next) => {
            const authHeader = req.headers["authorization"];
            if (!authHeader)
                return next(new http_errors_1.default.Unauthorized());
            const token = authHeader.replace('Bearer', '').replace('Bearer', '').trim();
            const publicKey = fs_1.default.readFileSync(path_1.default.join("dist/keys", "gontche_public.pem"), "utf-8");
            jsonwebtoken_1.default.verify(token, publicKey, (err, payload) => __awaiter(this, void 0, void 0, function* () {
                if (err) {
                    const message = err.name === "JsonWebTokenError" ? "Unauthorized" : err.name;
                    next(new http_errors_1.default.Unauthorized(message));
                }
                const isUserExist = yield this.userService.findByID({ id: payload && payload.aud });
                if (!isUserExist)
                    next(new http_errors_1.default.Unauthorized());
                res.locals.authUser = isUserExist;
                next();
            }));
        };
        this.signRefreshToken = (userID) => {
            const privateKey = fs_1.default.readFileSync(path_1.default.join("dist/keys", "gontche_private_refresh.pem"), "utf-8");
            const payload = {};
            const options = {
                audience: String(userID),
                expiresIn: "1y",
                algorithm: "RS256",
            };
            return new Promise((resolve, reject) => {
                jsonwebtoken_1.default.sign(payload, privateKey, options, (err, token) => __awaiter(this, void 0, void 0, function* () {
                    if (err) {
                        reject(new http_errors_1.default.InternalServerError());
                    }
                    try {
                        const result = yield this.redisClientManager.setKey(String(userID), String(token));
                        resolve(result);
                    }
                    catch (err) {
                        reject(new http_errors_1.default.InternalServerError(err.message));
                    }
                }));
            });
        };
        this.refreshTokenVerification = ({ refreshToken }) => __awaiter(this, void 0, void 0, function* () {
            const publicKey = fs_1.default.readFileSync(path_1.default.join("dist/keys", "gontche_public_refresh.pem"), "utf-8");
            return new Promise((resolve, reject) => {
                jsonwebtoken_1.default.verify(refreshToken, publicKey, (err, payload) => __awaiter(this, void 0, void 0, function* () {
                    if (err) {
                        return reject(new http_errors_1.default.Unauthorized());
                    }
                    try {
                        const userID = payload.aud;
                        const result = yield this.redisClientManager.getKey(userID);
                        if (result !== refreshToken)
                            reject(new http_errors_1.default.Unauthorized());
                        resolve(userID);
                    }
                    catch (err) {
                        reject(new http_errors_1.default.InternalServerError());
                    }
                }));
            });
        });
    }
    emailVerificationTokenGen({ email }) {
        const privateKey = fs_1.default.readFileSync(path_1.default.join('dist/keys', 'gontche_email_verification_private_key.pem'), 'utf-8');
        const payload = {};
        const options = {
            audience: email,
            expiresIn: '1d',
            algorithm: 'RS256',
        };
        return new Promise((resolve, reject) => {
            jsonwebtoken_1.default.sign(payload, privateKey, options, (err, emailToken) => {
                if (err) {
                    console.log(err);
                    reject(new http_errors_1.default.InternalServerError());
                }
                resolve({ emailToken });
            });
        });
    }
    verifyEmailVerificationToken({ emailVerificationToken }) {
        return __awaiter(this, void 0, void 0, function* () {
            const publicKey = fs_1.default.readFileSync(path_1.default.join('dist/keys', 'gontche_email_verification_public_key.pem'), 'utf-8');
            return new Promise((resolve, reject) => {
                jsonwebtoken_1.default.verify(emailVerificationToken, publicKey, (err, payload) => __awaiter(this, void 0, void 0, function* () {
                    if (err) {
                        return reject(new http_errors_1.default.Unauthorized());
                    }
                    try {
                        const email = payload.aud;
                        const isUserExist = yield this.userService.findByEmail({ email });
                        if (!isUserExist)
                            reject(new http_errors_1.default.Unauthorized());
                        resolve(isUserExist);
                    }
                    catch (err) {
                        reject(new http_errors_1.default.InternalServerError());
                    }
                }));
            });
        });
    }
    passwordRecoveryTokenGen({ email }) {
        const privateKey = fs_1.default.readFileSync(path_1.default.join('keys', 'password_recovery_private_key.pem'), 'utf-8');
        const payload = {};
        const options = {
            audience: email,
            expiresIn: '1d',
            algorithm: 'RS256',
        };
        return new Promise((resolve, reject) => {
            jsonwebtoken_1.default.sign(payload, privateKey, options, (err, emailToken) => {
                if (err) {
                    console.log(err);
                    reject(new http_errors_1.default.InternalServerError());
                }
                resolve({ emailToken });
            });
        });
    }
    verifyPasswordRecoveryToken({ passwordRecoveryToken }) {
        return __awaiter(this, void 0, void 0, function* () {
            const publicKey = fs_1.default.readFileSync(path_1.default.join('keys', 'gontche_password_recovery_public_key.pem'), 'utf-8');
            return new Promise((resolve, reject) => {
                jsonwebtoken_1.default.verify(passwordRecoveryToken, publicKey, (err, payload) => __awaiter(this, void 0, void 0, function* () {
                    if (err) {
                        return reject(new http_errors_1.default.Unauthorized());
                    }
                    try {
                        const email = payload.aud;
                        const isUserExist = yield this.userService.findByEmail({ email });
                        if (!isUserExist)
                            reject(new http_errors_1.default.Unauthorized());
                        resolve(isUserExist);
                    }
                    catch (err) {
                        reject(new http_errors_1.default.InternalServerError());
                    }
                }));
            });
        });
    }
};
JWTManager = __decorate([
    (0, typedi_1.Service)('JWTManager'),
    __param(0, (0, typedi_1.Inject)('RedisClient')),
    __param(1, (0, typedi_1.Inject)('serviceGenerator'))
], JWTManager);
exports.default = JWTManager;
