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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ({ AuthManager }) => class AuthController {
    constructor() {
        this.signUp = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const signupData = res.locals.validatedData;
                const token = yield AuthManager.signUp(signupData);
                res.send({ success: 1, data: Object.assign({}, token) });
            }
            catch (err) {
                next(err);
            }
        });
        this.signIn = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = res.locals.validatedData;
                const token = yield AuthManager.signIn({ email, password });
                res.send({ success: 1, data: Object.assign({}, token) });
            }
            catch (err) {
                next(err);
            }
        });
        this.refresh = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const refreshToken = res.locals.validatedData['refresh-token'];
                const token = yield AuthManager.refreshTokenService({ refreshToken });
                res.send({ success: 1, data: Object.assign({}, token) });
            }
            catch (err) {
                next(err);
            }
        });
        this.resetPassword = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
            }
            catch (error) {
                next(error);
            }
        });
    }
};
