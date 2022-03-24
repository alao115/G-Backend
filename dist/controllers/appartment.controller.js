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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ({ appartmentService, appartmentTypeService }) => class AppartmentController {
    constructor() {
        this.getAllAppartment = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const appartments = yield appartmentService.getAll();
                return res.send({ success: 1, data: { appartments } });
            }
            catch (error) {
                next(error);
            }
        });
        this.getAllAppartmentType = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const appartmentTypes = yield appartmentTypeService.getAll();
                return res.send({ success: 1, data: { appartmentTypes } });
            }
            catch (error) {
                next(error);
            }
        });
    }
};
