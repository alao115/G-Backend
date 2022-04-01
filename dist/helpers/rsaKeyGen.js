"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_rsa_1 = __importDefault(require("node-rsa"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const key = new node_rsa_1.default({ b: 1024 });
const public_key = key.exportKey('public');
const private_key = key.exportKey('private');
fs_1.default.writeFileSync(path_1.default.join('../keys', 'gontche_password_recovery_public_key.pem'), public_key);
fs_1.default.writeFileSync(path_1.default.join('../keys', 'gontche_password_recovery_private_key.pem'), private_key);
