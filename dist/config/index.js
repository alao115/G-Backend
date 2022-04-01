"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.default = {
    frontendUrl: process.env.FRONTEND_URL || '',
    emailHost: process.env.EMAIL_HOST || '',
    emailPort: process.env.EMAIL_PORT || '',
    emailSecure: process.env.EMAIL_SECURE || false,
    emailUser: process.env.EMAIL_USER || '',
    emailPassword: process.env.EMAIL_PASSWORD || '',
    environment: process.env.APP_ENV || 'development',
    hostname: process.env.APP_HOSTNAME || '127.0.0.1',
    port: process.env.APP_PORT || 7000,
    appName: process.env.APP_NAME || 'API Boilerplate',
    logLevel: 'debug',
    db: process.env.DB_NAME || 'mongodb://localhost/gontche-mongodb',
    redisPort: process.env.REDIS_PORT || '6379',
    redisHost: process.env.REDIS_HOST || 'redis',
    redisUri: process.env.REDIS_URI || 'redis://localhost:6379',
    redisPass: process.env.REDIS_PASS || '',
    redisDB: process.env.REDIS_DB || 'gontche-redis',
};
