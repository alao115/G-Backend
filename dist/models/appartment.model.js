"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const moment_1 = __importDefault(require("moment"));
const appartmentSchema = new mongoose_1.Schema({
    id: {
        type: String,
        default() {
            return this._id;
        }
    },
    mainImg: {
        type: String,
        default: ''
    },
    appartmentType: {
        type: String,
        required: true
    },
    isFurnished: {
        type: Boolean,
        default: false
    },
    location: {
        type: String,
    },
    rent: {
        type: Number,
        required: true
    },
    details: {
        type: String,
        default: ''
    },
    rooms: {
        type: Number,
        default: 0
    },
    bathrooms: {
        type: Number,
        default: 0
    },
    bedrooms: {
        type: Number,
        default: 0
    },
    livingrooms: {
        type: Number,
        default: 0
    },
    storageroom: {
        type: Number,
        default: 0
    },
    kitchen: {
        type: Number,
        default: 0
    },
    garage: {
        type: Number,
        default: 0
    },
    keeper: {
        type: Boolean,
        default: false
    },
    terrace: {
        type: Number,
        default: 0
    },
    garden: {
        type: Number,
        default: 0
    },
    ac: {
        type: Boolean,
        default: false
    },
    pool: {
        type: Boolean,
        default: false
    },
    householdsTotal: {
        type: Number,
        default: 0
    },
    groundLevel: {
        type: Number,
        default: 0
    },
    conditions: {
        advancePayment: {
            type: Number,
            default: 0
        },
        energyCommission: {
            type: Number,
            default: 0
        },
        prepaidRentMonths: {
            type: Number,
            default: 0
        },
        rent: {
            type: Number,
            default: 0
        },
        paymentFrequency: {
            type: Number,
            default: 0
        }
    },
    ownerInfos: {
        civility: {
            type: String,
            required: true
        },
        firstname: {
            type: String,
            required: true
        },
        lastname: {
            type: String,
            required: true
        },
        address: {
            type: String,
        },
        isAlive: {
            type: Boolean,
            default: true
        },
        phone: {
            type: String,
            required: true
        },
        email: {
            type: String,
        },
    },
    likes: {
        type: Number,
        default: 0
    },
    favorite: {
        type: Number,
        default: 0
    },
}, {
    timestamps: { currentTime: () => (0, moment_1.default)().unix() }
});
exports.default = (0, mongoose_1.model)('appartments', appartmentSchema);
