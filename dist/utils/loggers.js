"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.success = exports.info = exports.error = void 0;
const chalk_1 = __importDefault(require("chalk"));
function error(...options) {
    console.log(`${chalk_1.default.red("[")}-${chalk_1.default.red("]")}`, ...options);
}
exports.error = error;
function info(...options) {
    console.log(`${chalk_1.default.blueBright("[")} ? ${chalk_1.default.blueBright("]")}`, ...options);
}
exports.info = info;
function success(...options) {
    console.log(`${chalk_1.default.greenBright("[")} + ${chalk_1.default.greenBright("]")}`, ...options);
}
exports.success = success;
