"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const gontche_project_firebase_adminsdk_x3f17_e3118f7198_1 = __importDefault(require("../keys/gontche-project-firebase-adminsdk-x3f17-e3118f7198"));
firebase_admin_1.default.initializeApp({
    credential: firebase_admin_1.default.credential.cert(gontche_project_firebase_adminsdk_x3f17_e3118f7198_1.default),
    databaseURL: 'https://gontche-project-default-rtdb.firebaseio.com/',
    storageBucket: 'gs://gontche-project.appspot.com',
});
exports.default = { admin: firebase_admin_1.default };
