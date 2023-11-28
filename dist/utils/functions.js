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
exports.downloadImages = exports.getImages = void 0;
const chalk_1 = __importDefault(require("chalk"));
const fs_1 = __importDefault(require("fs"));
const jsdom_1 = require("jsdom");
const api_1 = require("./api");
const loggers_1 = require("./loggers");
const BASE_URL = "im.vsco.co/aws-us-west-2/";
function getImages(html, folderName) {
    const dom = new jsdom_1.JSDOM(html);
    const document = dom.window.document;
    const urls = [];
    const imageElements = document.querySelectorAll("img[srcSet]");
    imageElements.forEach((imgElement) => {
        const src = imgElement.getAttribute("srcSet");
        if (src && src.includes(BASE_URL)) {
            urls.push(src.split("\n")[0].replace("//", "https://").replace(" 1x,", ""));
        }
    });
    downloadImages(urls, folderName);
    console.log(urls);
}
exports.getImages = getImages;
function downloadImages(urls, folderName) {
    return __awaiter(this, void 0, void 0, function* () {
        const downloadPromises = urls.map((imageUrl) => __awaiter(this, void 0, void 0, function* () { return (0, api_1.downloadImage)(imageUrl, folderName); }));
        if (fs_1.default.readdirSync(folderName).length > 0) {
            (0, loggers_1.error)(`Directory '${folderName}' is not empty!`);
            process.exit();
        }
        (0, loggers_1.info)(`Found ${urls.length} ${urls.length > 1 ? "images" : "image"}`);
        if (fs_1.default.readdirSync(folderName).length > 0) {
            console.log(`${chalk_1.default.red("[")} - ${chalk_1.default.red("]")} Directory is not empty`);
            return;
        }
        Promise.all(downloadPromises)
            .then((downloadedPaths) => {
            (0, loggers_1.info)(`All images downloaded successfully:`, downloadedPaths.length);
        })
            .catch((error) => {
            error("Error downloading images:", error);
        });
    });
}
exports.downloadImages = downloadImages;
