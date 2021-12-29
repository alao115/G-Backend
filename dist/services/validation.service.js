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
const joi_1 = __importDefault(require("joi"));
const http_errors_1 = __importDefault(require("http-errors"));
class ValidationManager {
    constructor() {
        this.schemas = {
            signup: joi_1.default.object({
                email: joi_1.default.string().email().required(),
                firstname: joi_1.default.string().required(),
                lastname: joi_1.default.string().required(),
                password: joi_1.default.string().min(8).required()
            }),
            signin: joi_1.default.object({
                email: joi_1.default.string().email().required(),
                password: joi_1.default.string().min(8).required()
            }),
            refreshToken: joi_1.default.object({
                'refresh-token': joi_1.default.string().required()
            }),
            resetPassword: joi_1.default.object({
                email: joi_1.default.string().email().required(),
            })
        };
    }
    validationHelper(schema) {
        return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                let result = null;
                if (req.file) {
                    result = yield schema.validateAsync(Object.assign(Object.assign({}, req.body), { file: req.file.buffer }), { abortEarly: false });
                }
                else
                    result = yield schema.validateAsync(req.body, { abortEarly: false });
                res.locals.validatedData = result;
                next();
            }
            catch (err) {
                next(new http_errors_1.default.BadRequest(err.message));
            }
        });
    }
}
exports.default = ValidationManager;
