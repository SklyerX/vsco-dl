#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const download_1 = __importDefault(require("./commands/download"));
const program = new commander_1.Command();
program
    .name("vsco-dl")
    .description("A basic CLI tool to download vsco profiles")
    .version("1.0.0");
program
    .command("download")
    .description("download a users gallery")
    .argument("<page-url>", "the url of the users gallery")
    .argument("[output-file]", "where you'd like to store the images (folder)", (fn) => fn, ".")
    .action(download_1.default);
program.parse();
