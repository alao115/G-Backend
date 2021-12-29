"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = exports.AuthController = void 0;
const authController_1 = __importDefault(require("./authController"));
const userController_1 = __importDefault(require("./userController"));
const services_1 = require("../services");
const AuthController = new ((0, authController_1.default)({ AuthManager: services_1.AuthManager }))();
exports.AuthController = AuthController;
const UserController = new ((0, userController_1.default)({ userService: services_1.userService }))();
exports.UserController = UserController;
