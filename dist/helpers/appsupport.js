"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.basicErrorHandler = exports.handle404 = exports.onListening = exports.onError = exports.normalizePort = void 0;
const consola_1 = __importDefault(require("consola"));
const http_errors_1 = __importDefault(require("http-errors"));
function normalizePort(val) {
    const port = parseInt(val, 10);
    if (Number.isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
}
exports.normalizePort = normalizePort;
function onError({ error, port }) {
    console.log('Error: ', error);
    if (error && error.syscall !== 'listen') {
        throw error;
    }
    const bind = typeof port === 'string' ?
        `Pipe ${port}` :
        `Port ${port}`;
    if (error) {
        switch (error.code) {
            case 'EACCES':
                consola_1.default.error(`${bind} requires elevated privileges`);
                process.exit(1);
                break;
            case 'EADDRINUSE':
                consola_1.default.error(`${bind} is already in use`);
                process.exit(1);
                break;
            default:
                throw error;
        }
    }
}
exports.onError = onError;
function onListening({ server }) {
    const addr = server.address();
    consola_1.default.success(`Http server start on: http://localhost:${addr.port}`);
}
exports.onListening = onListening;
function handle404(_req, _res, next) {
    next(new http_errors_1.default.NotFound("Route not found"));
}
exports.handle404 = handle404;
function basicErrorHandler(err, req, res, _next) {
    res.status(err.status || 500);
    err.message = req.app.get('env') === 'development' ? err.message : new http_errors_1.default.InternalServerError();
    res.send({ error: { status: err.status, message: err.message } });
}
exports.basicErrorHandler = basicErrorHandler;
