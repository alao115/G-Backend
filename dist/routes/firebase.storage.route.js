"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const controllers_1 = require("../controllers");
const uploadMiddleware = (0, multer_1.default)({});
const router = (0, express_1.default)();
exports.default = ({ app, ValidationManager, JWTManager }) => {
    app.use('/storage', router);
    router.post('/upload', uploadMiddleware.single('file'), ValidationManager.validationHelper(ValidationManager.schemas().fileUpload), controllers_1.firebaseStorageController.upload);
    router.get('/download', ValidationManager.validationHelper(ValidationManager.schemas().fileDownloadDeletion), controllers_1.firebaseStorageController.download);
    router.post('/delete', ValidationManager.validationHelper(ValidationManager.schemas().fileDownloadDeletion), controllers_1.firebaseStorageController.delete);
};
