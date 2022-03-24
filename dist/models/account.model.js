"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const moment_1 = __importDefault(require("moment"));
var UserType;
(function (UserType) {
    UserType[UserType["ADMIN"] = 0] = "ADMIN";
    UserType[UserType["PUBLISHER"] = 1] = "PUBLISHER";
    UserType[UserType["SIMPLE"] = 2] = "SIMPLE";
    UserType[UserType["OWNER"] = 3] = "OWNER";
})(UserType || (UserType = {}));
const accountSchema = new mongoose_1.Schema({
    id: {
        type: String,
        default() {
            return this._id;
        }
    },
    user: {
        type: String,
        required: true
    },
    userType: {
        type: Number,
        default: 1
    },
    status: {
        type: String,
    },
    createdAt: String,
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    civility: {
        type: String,
    },
    phone: {
        type: String,
    },
    email: {
        type: String,
        required: true
    },
    adminType: {
        type: String,
    },
    updatedAt: String,
}, { timestamps: { currentTime: () => (0, moment_1.default)().unix() } });
exports.default = (0, mongoose_1.model)('accounts', accountSchema);
