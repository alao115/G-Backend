"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = exports.resolvers = void 0;
var resolvers_1 = require("./resolvers");
Object.defineProperty(exports, "resolvers", { enumerable: true, get: function () { return __importDefault(resolvers_1).default; } });
var schema_1 = require("./schema");
Object.defineProperty(exports, "typeDefs", { enumerable: true, get: function () { return __importDefault(schema_1).default; } });
