"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
const http_errors_1 = __importDefault(require("http-errors"));
const argon2_1 = __importDefault(require("argon2"));
const config_1 = __importDefault(require("../config"));
const typedi_1 = require("typedi");
let AuthManager = class AuthManager {
    constructor(JWTManager, userService, accountService, mailService) {
        this.JWTManager = JWTManager;
        this.userService = userService;
        this.accountService = accountService;
        this.mailService = mailService;
    }
    signUp(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = data;
                const isUserExisted = yield this.userService.findByEmail({ email });
                if (isUserExisted)
                    throw new http_errors_1.default.Conflict("Email already existed");
                const hashedPassword = yield argon2_1.default.hash(password);
                const user = yield this.userService.create(Object.assign(Object.assign({}, data), { password: hashedPassword }));
                const account = yield this.accountService.create(Object.assign(Object.assign({}, data), { user: user.id }));
                const accessToken = yield this.JWTManager.signToken(user.id);
                const refreshToken = yield this.JWTManager.signRefreshToken(user.id);
                return Object.freeze(Object.assign(Object.assign({}, accessToken), { refreshToken }));
            }
            catch (err) {
                throw err;
            }
        });
    }
    ;
    signIn({ email, password }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.userService.findByEmail({ email });
                if (!user)
                    throw new http_errors_1.default.NotFound("User not found");
                const isPasswordCorrect = yield argon2_1.default.verify(user.password, password);
                if (!isPasswordCorrect)
                    throw new http_errors_1.default.Unauthorized("Email/Password not valid");
                const accessToken = yield this.JWTManager.signToken(user.id);
                const refreshToken = yield this.JWTManager.signRefreshToken(user.id);
                return Object.freeze(Object.assign(Object.assign({}, accessToken), { refreshToken }));
            }
            catch (err) {
                throw err;
            }
        });
    }
    ;
    refreshTokenService({ refreshToken }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.JWTManager.refreshTokenVerification({ refreshToken });
                const accessToken = yield this.JWTManager.signToken(data);
                const refreshtoken = yield this.JWTManager.signRefreshToken(data);
                return Object.freeze(Object.assign(Object.assign({}, accessToken), { refreshToken: refreshtoken }));
            }
            catch (err) {
                throw err;
            }
        });
    }
    ;
    resetPassword({ email }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.userService.findByEmail({ email });
                if (!user)
                    throw new http_errors_1.default.NotFound("User not found");
            }
            catch (error) {
                throw error;
            }
        });
    }
    ;
    emailTokenVerification({ emailToken }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.JWTManager.verifyEmailVerificationToken({ emailVerificationToken: emailToken });
                const response = yield this.userService.update({ id: user._id, data: { emailVerified: true } });
                return Object.assign(Object.assign({}, user), response);
            }
            catch (error) {
                throw error;
            }
        });
    }
    passwordRecoveryTokenVerification({ emailToken }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.JWTManager.verifyPasswordRecoveryToken({ emailVerificationToken: emailToken });
                return user;
            }
            catch (error) {
                throw error;
            }
        });
    }
    sendVerificationMail({ email, isPassword }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.userService.findByEmail({ email });
                if (!user)
                    throw new http_errors_1.default.NotFound('No such user found in our records');
                const userAccount = yield this.accountService.findOne({ user: user.id });
                const { emailToken } = isPassword ? yield this.JWTManager.passwordRecoveryTokenGen({ email }) : yield this.JWTManager.emailVerificationTokenGen({ email });
                const verificationUrl = `${config_1.default.frontendUrl}/auth/signup/${!isPassword ? 'email-verified' : 'new-password'}?token=${emailToken}`, from = 'catch-all@rcg.studio', subject = isPassword ? 'Réinitialisation mot de passe.' : 'Vérification d\'adresse email', content = `
        <div style=" display: flex; flex-direction: column; overflow-wrap: break-word; padding-bottom: 28px; width: 100%;">
          <span _ngcontent-vhn-c70="" class="preview-label">Message</span><div _ngcontent-vhn-c70=""><p>Bonjour ${userAccount.firstname} ${userAccount.lastname},</p>
          <p>Cliquez sur ce lien pour ${isPassword ? 'réinitialiser votre mot de passe.' : 'valider votre adresse e-mail.'}</p>
          <p><a href="${verificationUrl}">${verificationUrl}</a></p>
          <p>Si vous n'avez pas demandé à valider cette adresse, vous pouvez ignorer cet e-mail.</p>
          <p>Merci,</p>
        </div>`;
                const response = yield this.mailService.sendMail({ from, to: user.email, content, subject });
                console.log('Response: ', response);
                return Object.assign(Object.assign({}, user), userAccount);
            }
            catch (error) {
                throw error;
            }
        });
    }
};
AuthManager = __decorate([
    (0, typedi_1.Service)('AuthManager')
], AuthManager);
exports.default = AuthManager;
