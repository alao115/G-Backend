"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const https_1 = __importDefault(require("https"));
const http_1 = require("http");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const config_1 = __importDefault(require("../config"));
const appsupport_1 = require("../helpers/appsupport");
exports.default = ({ app }) => new Promise((resolve, reject) => {
    const port = (0, appsupport_1.normalizePort)(config_1.default.port);
    const hostname = (0, appsupport_1.normalizePort)(config_1.default.hostname);
    if (app.get('env') === 'development') {
        const server = (0, http_1.createServer)(app);
        server.listen(port, hostname);
        server.on('listening', () => resolve(server));
        server.on('error', (error) => reject({ error, port }));
    }
    else {
        const option = {
            key: fs_1.default.readFileSync(path_1.default.join('keys', 'server.key'), 'utf-8'),
            cert: fs_1.default.readFileSync(path_1.default.join('keys', 'server.cert'), 'utf-8'),
        };
        const server = https_1.default.createServer(option, app);
        server.listen(port, hostname);
        server.on('listening', () => resolve(server));
        server.on('error', (error) => reject({ error, port }));
    }
});
