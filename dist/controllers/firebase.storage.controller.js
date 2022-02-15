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
exports.default = ({ firebaseStorageService }) => class firebaseStorageController {
    constructor() {
        this.upload = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { filePath } = res.locals.validatedData;
                const { file } = req;
                const fileInfo = yield firebaseStorageService.upload({ filePath, file });
                res.send({ success: 1, data: { fileInfo } });
            }
            catch (error) {
                next(error);
            }
        });
        this.download = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { filePath } = res.locals.payload.validatedData;
                const file = yield firebaseStorageService.download({ filePath });
                res.send({ success: 1, data: { file } });
            }
            catch (error) {
                next(error);
            }
        });
        this.delete = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { filePath } = res.locals.payload.validatedData;
                if (!filePath)
                    throw new Error('File path is missing');
                const file = yield firebaseStorageService.delete({ filePath });
                res.send({ success: 1, data: { file } });
            }
            catch (error) {
                next(error);
            }
        });
    }
};
