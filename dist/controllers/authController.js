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
                const emailData = yield AuthManager.sendVerificationMail({ email: signupData.email, isPassword: false });
                res.send({ success: 1, data: Object.assign({}, emailData) });
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
                const { email, password } = res.locals.validatedData;
                const response = yield AuthManager.resetPassword({ email, password });
                res.send({ success: 1, data: Object.assign({}, response) });
            }
            catch (error) {
                next(error);
            }
        });
        this.emailVerification = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const emailToken = res.locals.validatedData['email-token'];
                const response = yield AuthManager.emailTokenVerification({ emailToken });
                res.send({ success: 1, data: { emailVerified: !!response.nModified } });
            }
            catch (err) {
                next(err);
            }
        });
        this.passwordRecoveryTokenVerification = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const passwordRecoveryToken = res.locals.validatedData['password-recovery-token'];
                const response = yield AuthManager.passwordRecoveryTokenVerification({ passwordRecoveryToken });
                res.send({ success: 1, data: { user: response } });
            }
            catch (error) {
                console.log(error);
                next(error);
            }
        });
    }
    sendVerificationMail({ isPassword } = { isPassword: false }) {
        return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { email } = res.locals.validatedData;
                yield AuthManager.sendVerificationMail({ email, isPassword });
                res.send({ success: 1, message: 'Verification mail sent successfully' });
            }
            catch (error) {
                console.log(error);
                next(error);
            }
        });
    }
};
