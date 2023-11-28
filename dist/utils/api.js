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
exports.downloadImage = void 0;
const axios_1 = __importDefault(require("axios"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const loggers_1 = require("./loggers");
function downloadImage(url, folderPath) {
    return __awaiter(this, void 0, void 0, function* () {
        if (fs_1.default.existsSync(folderPath) === false ||
            fs_1.default.lstatSync(folderPath).isDirectory() === false) {
            fs_1.default.mkdirSync(folderPath);
        }
        const fileName = path_1.default.basename(url);
        const destinationPath = path_1.default.join(folderPath, fileName);
        const response = yield (0, axios_1.default)({
            method: "GET",
            url: url,
            responseType: "arraybuffer",
        });
        try {
            yield fs_1.default.promises.writeFile(destinationPath, response.data);
            (0, loggers_1.success)(`Downloaded: ${url}`);
        }
        catch (err) {
            (0, loggers_1.error)(`Error writing file ${destinationPath}: ${err}`);
        }
    });
}
exports.downloadImage = downloadImage;
