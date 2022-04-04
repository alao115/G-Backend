"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const moment_1 = __importDefault(require("moment"));
const visitSchema = new mongoose_1.Schema({
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
    visitorInfos: {
        firstname: {
            type: String,
            default: ''
        },
        lastname: {
            type: String,
            default: ''
        },
        phone: {
            type: String,
            default: ''
        },
        email: {
            type: String,
            default: ''
        },
    },
    date: {
        type: String,
        required: true,
        get: (v) => moment_1.default.unix(v).format("YYYY-MM-DD")
    },
    status: {
        type: String,
        default: ''
    }
}, {
    timestamps: { currentTime: () => (0, moment_1.default)().unix() }
});
exports.default = (0, mongoose_1.model)('visits', visitSchema);
