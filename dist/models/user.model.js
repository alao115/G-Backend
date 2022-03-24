"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const moment_1 = __importDefault(require("moment"));
const userSchema = new mongoose_1.Schema({
    id: {
        type: mongoose_1.Schema.Types.ObjectId,
        default() {
            return this._id;
        }
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    userType: {
        type: Number,
        default: 1
    },
    createdAt: String,
    updatedAt: String
}, { timestamps: { currentTime: () => (0, moment_1.default)().unix() } });
userSchema.methods.isPasswordCorrect = () => { };
exports.default = (0, mongoose_1.model)('users', userSchema);
