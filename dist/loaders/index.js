"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("./express"));
const db_1 = __importDefault(require("./db"));
const consola_1 = __importDefault(require("consola"));
const graphql_1 = __importDefault(require("./graphql"));
exports.default = ({ app }) => {
    return (0, db_1.default)()
        .then(() => consola_1.default.success("Loading database loader successfully"))
        .then(() => (0, graphql_1.default)({ app }))
        .then(() => consola_1.default.success("Loading graphQL loader successfully"))
        .then(() => (0, express_1.default)({ app }))
        .then(() => consola_1.default.success("Loading express loader successfully"))
        .catch(err => {
        consola_1.default.error(err);
        process.exit(1);
    });
};
