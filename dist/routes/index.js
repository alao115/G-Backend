"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRoute_1 = __importDefault(require("./userRoute"));
const authRoute_1 = __importDefault(require("./authRoute"));
const firebase_storage_route_1 = __importDefault(require("./firebase.storage.route"));
const services_1 = require("../services");
exports.default = () => {
    const app = (0, express_1.default)();
    (0, authRoute_1.default)({ app, ValidationManager: services_1.validationService });
    (0, userRoute_1.default)({ app, ValidationManager: services_1.validationService, JWTService: services_1.JWTService });
    (0, firebase_storage_route_1.default)({ app, ValidationManager: services_1.validationService, JWTManager: services_1.JWTService });
    return app;
};
