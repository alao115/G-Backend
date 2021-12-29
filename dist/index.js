"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const server_1 = __importDefault(require("./server"));
const loaders_1 = __importDefault(require("./loaders"));
const config_1 = __importDefault(require("./config"));
const appsupport_1 = require("./helpers/appsupport");
function startApp() {
    const app = (0, express_1.default)();
    app.set('env', config_1.default.environment);
    app.use((0, cors_1.default)());
    (0, loaders_1.default)({ app })
        .then(() => (0, server_1.default)({ app }))
        .then((server) => (0, appsupport_1.onListening)({ server }))
        .catch(({ error, port }) => (0, appsupport_1.onError)({ error, port }));
}
startApp();
