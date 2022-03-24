"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppartmentController = exports.firebaseStorageController = exports.UserController = exports.AuthController = void 0;
const authController_1 = __importDefault(require("./authController"));
const userController_1 = __importDefault(require("./userController"));
const firebase_storage_controller_1 = __importDefault(require("./firebase.storage.controller"));
const appartment_controller_1 = __importDefault(require("./appartment.controller"));
const services_1 = require("../services");
const AuthController = new ((0, authController_1.default)({ AuthManager: services_1.AuthManager }))();
exports.AuthController = AuthController;
const UserController = new ((0, userController_1.default)({ userService: services_1.userService }))();
exports.UserController = UserController;
const firebaseStorageController = new ((0, firebase_storage_controller_1.default)({ firebaseStorageService: services_1.firebaseStorageService }))();
exports.firebaseStorageController = firebaseStorageController;
const AppartmentController = new ((0, appartment_controller_1.default)({ appartmentService: services_1.appartmentService, appartmentTypeService: services_1.appartmentTypeService }))();
exports.AppartmentController = AppartmentController;
