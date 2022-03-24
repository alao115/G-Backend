"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = (0, express_1.default)();
exports.default = ({ app, ValidationManager, AuthController }) => {
    app.use('/auth/', router);
    router.post('/signup', ValidationManager.validationHelper(ValidationManager.schemas().signup), AuthController.signUp);
    router.post('/signin', ValidationManager.validationHelper(ValidationManager.schemas().signin), AuthController.signIn);
    router.post('/refresh-token', ValidationManager.validationHelper(ValidationManager.schemas().refreshToken), AuthController.refresh);
    router.post('/password-reset', ValidationManager.validationHelper(ValidationManager.schemas().resetPassword), AuthController.resetPassword);
};
