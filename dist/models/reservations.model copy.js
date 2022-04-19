"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const moment_1 = __importDefault(require("moment"));
const reservationSchema = new mongoose_1.Schema({
    id: {
        type: String,
        default() {
            return this._id;
        }
    },
    appartment: {
        type: String,
        required: true,
    },
    user: {
        type: String,
        required: true,
    },
    createdBy: String,
    createdAt: String,
    status: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    }
}, {
    timestamps: { currentTime: () => (0, moment_1.default)().unix() }
});
exports.default = (0, mongoose_1.model)('reservations', reservationSchema);
