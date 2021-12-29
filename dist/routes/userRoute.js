"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
const router = (0, express_1.default)();
exports.default = ({ app, ValidationManager, JWTService }) => {
    app.use('/users', router);
    router.use(JWTService.verifyAccessToken);
    router.post('/', controllers_1.UserController.create);
    router.get('/', controllers_1.UserController.getAll);
    router.get('/me', controllers_1.UserController.getAuthUser);
    router.patch('/:userID', controllers_1.UserController.update);
    router.delete('/:userID', controllers_1.UserController.delete);
};
