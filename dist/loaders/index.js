"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("./express"));
const db_1 = __importDefault(require("./db"));
const consola_1 = __importDefault(require("consola"));
const graphql_1 = __importDefault(require("./graphql"));
exports.default = ({ app }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, db_1.default)();
        consola_1.default.success("Loading database loader successfully");
        yield (0, graphql_1.default)({ app });
        consola_1.default.success("Loading graphQL loader successfully");
        yield (0, express_1.default)({ app });
        return consola_1.default.success("Loading express loader successfully");
    }
    catch (err) {
        consola_1.default.error(err);
        process.exit(1);
    }
});
