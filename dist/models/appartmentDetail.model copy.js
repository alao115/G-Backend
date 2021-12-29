"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const moment_1 = __importDefault(require("moment"));
const appartmentDetailSchema = new mongoose_1.Schema({
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
    createdBy: String,
    createdAt: String,
    groundLevel: {
        type: String,
        required: true,
    },
    isFurnished: {
        type: Boolean,
        required: true,
    },
    hasFloors: {
        type: Boolean,
        required: true,
    },
    numberOfFloors: {
        type: Number,
        required: true,
    },
    hasBedroom: {
        type: Boolean,
        required: true,
    },
    numberOfBedrooms: {
        type: Number,
        required: true,
    },
    hasLivingroom: {
        type: Boolean,
        required: true,
    },
    numberOfLivingrooms: {
        type: Number,
        required: true,
    },
    hasKitchen: {
        type: Boolean,
        required: true,
    },
    numberOfKitchen: {
        type: Number,
        required: true,
    },
    hasBathrooms: {
        type: Boolean,
        required: true,
    },
    numberOfBathrooms: {
        type: Number,
        required: true,
    },
    hasStorageroom: {
        type: Boolean,
        required: true,
    },
    numberOfStoragerooms: {
        type: Number,
        required: true,
    },
    hasGarage: {
        type: Boolean,
        required: true,
    },
    numberOfGarage: {
        type: Number,
        required: true,
    },
    hasGarden: {
        type: Boolean,
        required: true,
    },
    numberOfGarden: {
        type: Number,
        required: true,
    },
    hasAC: {
        type: Boolean,
        required: true,
    },
    numberOfACs: {
        type: Number,
        required: true,
    },
    hasPool: {
        type: Boolean,
        required: true,
    },
    numberOfPools: {
        type: Number,
        required: true,
    },
    hasKeeper: {
        type: Boolean,
        required: true,
    },
    totalOfHouseholds: {
        type: Number,
        required: true,
    }
}, {
    timestamps: { currentTime: () => (0, moment_1.default)().unix() }
});
exports.default = (0, mongoose_1.model)('appartmentDetails', appartmentDetailSchema);
