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
const url_1 = require("../utils/validators/url");
const functions_1 = require("../utils/functions");
const loggers_1 = require("../utils/loggers");
const puppeteer_1 = __importDefault(require("puppeteer"));
const chalk_1 = __importDefault(require("chalk"));
function download(str, options) {
    return __awaiter(this, void 0, void 0, function* () {
        const { success } = url_1.UrlValidator.safeParse({
            url: str,
        });
        if (!success) {
            (0, loggers_1.error)(`Invalid url format! Format should be: ${chalk_1.default.magenta("https://vsco.co/<name>/gallery")}`);
            process.exit();
        }
        const browser = yield puppeteer_1.default.launch({
            headless: "new",
        });
        const page = yield browser.newPage();
        yield page.goto(str);
        const searchResultSelector = ".css-1xzaqs6.e1xqpt600";
        yield page.waitForSelector(searchResultSelector);
        yield page.click(searchResultSelector);
        let previousHeight = yield page.evaluate(() => document.body.scrollHeight);
        while (true) {
            yield page.evaluate(() => {
                window.scrollTo(0, document.body.scrollHeight - 1200);
            });
            yield page.waitForTimeout(2000);
            const currentHeight = yield page.evaluate(() => document.body.scrollHeight);
            if (currentHeight === previousHeight) {
                break;
            }
            previousHeight = currentHeight;
        }
        (0, loggers_1.info)("Reached the bottom of the dynamically loading page.");
        const imageUrls = yield page.$$eval("img[srcSet]", (imgElements) => {
            return imgElements.map((img) => img.srcset
                .split("\n")[0]
                .replace("//", "https://")
                .replace(" 1x,", "")
                .replace("?w=480", ""));
        });
        (0, functions_1.downloadImages)(imageUrls, options);
        yield browser.close();
    });
}
exports.default = download;
