"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_routes_1 = __importDefault(require("./user.routes"));
const auth_routes_1 = __importDefault(require("./auth.routes"));
const firebase_storage_routes_1 = __importDefault(require("./firebase.storage.routes"));
const appartment_routes_1 = __importDefault(require("./appartment.routes"));
const services_1 = require("../services");
const controllers_1 = require("../controllers");
exports.default = () => {
    const app = (0, express_1.default)();
    (0, auth_routes_1.default)({ app, ValidationManager: services_1.validationService, AuthController: controllers_1.AuthController });
    (0, user_routes_1.default)({ app, ValidationManager: services_1.validationService, JWTService: services_1.JWTService, UserController: controllers_1.UserController });
    (0, firebase_storage_routes_1.default)({ app, ValidationManager: services_1.validationService, JWTManager: services_1.JWTService, firebaseStorageController: controllers_1.firebaseStorageController });
    (0, appartment_routes_1.default)({ app, AppartmentController: controllers_1.AppartmentController });
    return app;
};
