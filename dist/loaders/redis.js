"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = require("redis");
const consola_1 = __importDefault(require("consola"));
const config_1 = __importDefault(require("../config"));
exports.default = () => {
    const client = (0, redis_1.createClient)(config_1.default.redisUri, { db: config_1.default.redisDB });
    return new Promise((resolve, reject) => {
        client.on("connect", () => {
            consola_1.default.success("Redis client is connected to the redis server");
        });
        client.on("ready", () => {
            consola_1.default.success("Redis client is ready to be used");
            resolve(client);
        });
        client.on("error", function (err) {
            reject(err);
        });
        process.on("SIGINT", () => {
            client.quit();
        });
    });
};
