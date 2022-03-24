"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = (0, express_1.default)();
exports.default = ({ app, AppartmentController }) => {
    app.use('/appartments/', router);
    router.get('/', AppartmentController.getAllAppartment);
    router.get('/appartmenttypes', AppartmentController.getAllAppartmentType);
};
