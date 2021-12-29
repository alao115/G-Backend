"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { connect } = mongoose_1.default;
const config_1 = __importDefault(require("../config"));
exports.default = () => {
    return new Promise((resolve, reject) => {
        connect(config_1.default.db, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
            .then(connection => resolve(connection))
            .catch(err => reject(err));
    });
};
