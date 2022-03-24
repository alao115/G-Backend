"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const uploadMiddleware = (0, multer_1.default)({});
const router = (0, express_1.default)();
exports.default = ({ app, ValidationManager, JWTManager, firebaseStorageController }) => {
    app.use('/storage', router);
    router.post('/upload', uploadMiddleware.single('file'), ValidationManager.validationHelper(ValidationManager.schemas().fileUpload), firebaseStorageController.upload);
    router.post('/download', ValidationManager.validationHelper(ValidationManager.schemas().fileDownloadDeletion), firebaseStorageController.download);
    router.post('/delete', ValidationManager.validationHelper(ValidationManager.schemas().fileDownloadDeletion), firebaseStorageController.delete);
};
