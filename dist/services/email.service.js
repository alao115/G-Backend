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
const nodemailer_1 = __importDefault(require("nodemailer"));
const config_1 = __importDefault(require("../config"));
class MailService {
    sendMail({ from, to, content, subject, attachments }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const testAccount = yield nodemailer_1.default.createTestAccount();
                const transporter = nodemailer_1.default.createTransport({
                    host: config_1.default.emailHost || 'smtp.ethereal.email',
                    auth: {
                        user: config_1.default.emailUser || testAccount.user,
                        pass: config_1.default.emailPassword || testAccount.pass,
                    },
                });
                const info = yield transporter.sendMail({
                    from,
                    to,
                    subject,
                    html: content,
                    attachments
                });
                console.log('Preview URL: %s', nodemailer_1.default.getTestMessageUrl(info));
                return { info: info.messageId, preview: nodemailer_1.default.getTestMessageUrl(info) };
            }
            catch (err) {
                throw err;
            }
        });
    }
}
exports.default = MailService;
