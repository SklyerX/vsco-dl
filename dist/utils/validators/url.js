"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UrlValidator = void 0;
const zod_1 = require("zod");
exports.UrlValidator = zod_1.z.object({
    url: zod_1.z
        .string()
        .url()
        .regex(/^https:\/\/vsco\.co\/\w+\/?\/gallery$/, "URL"),
});
