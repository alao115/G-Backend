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
const uuidv4_1 = require("uuidv4");
exports.default = ({ firebaseAdmin }) => class firebaseStorageService {
    upload({ filePath, file }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const bucket = firebaseAdmin.storage().bucket();
                const fileToUpload = bucket.file(filePath);
                yield fileToUpload.save(file.buffer, {
                    destination: filePath,
                    metadata: {
                        metadata: {
                            firebaseStorageDownloadTokens: (0, uuidv4_1.uuid)(),
                        },
                    },
                });
                const response = yield fileToUpload.getSignedUrl({
                    action: 'read',
                    expires: '03-09-6491',
                });
                return response[0];
            }
            catch (error) {
                throw error;
            }
        });
    }
    download({ filePath }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const bucket = firebaseAdmin.storage().bucket();
                const fileToDownload = bucket.file(filePath);
                const response = yield fileToDownload.getSignedUrl({
                    action: 'read',
                    expires: '03-09-2491',
                });
                return response[0];
            }
            catch (error) {
                throw error;
            }
        });
    }
    delete({ filePath }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const bucket = firebaseAdmin.storage().bucket();
                const fileToDownload = bucket.file(filePath);
                const response = yield fileToDownload.delete();
                return response;
            }
            catch (error) {
                throw error;
            }
        });
    }
};
