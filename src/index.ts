#!/usr/bin/env node

import { Command } from "commander";

import download from "./commands/download";

const program = new Command();

program
  .name("vsco-dl")
  .description("A basic CLI tool to download vsco profiles")
  .version("1.0.0");

program
  .command("download")
  .description("download a users gallery")
  .argument("<page-url>", "the url of the users gallery")
  .argument(
    "[output-file]",
    "where you'd like to store the images (folder)",
    (fn) => fn,
    "."
  )
  .action(download);

program.parse();
