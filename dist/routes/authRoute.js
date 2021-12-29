"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
const router = (0, express_1.default)();
exports.default = ({ app, ValidationManager }) => {
    app.use('/auth/', router);
    router.post('/signup', ValidationManager.validationHelper(ValidationManager.schemas.signup), controllers_1.AuthController.signUp);
    router.post('/signin', ValidationManager.validationHelper(ValidationManager.schemas.signin), controllers_1.AuthController.signIn);
    router.post('/refresh-token', ValidationManager.validationHelper(ValidationManager.schemas.refreshToken), controllers_1.AuthController.refresh);
    router.post('/password-reset', ValidationManager.validationHelper(ValidationManager.schemas.resetPassword), controllers_1.AuthController.resetPassword);
};
