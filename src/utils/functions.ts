import chalk from "chalk";
import fs from "fs";
import { JSDOM } from "jsdom";
import { downloadImage } from "./api";
import { error, info } from "./loggers";

const BASE_URL = "im.vsco.co/aws-us-west-2/";

export function getImages(html: string, folderName: string) {
  const dom = new JSDOM(html);
  const document = dom.window.document;

  const urls: string[] = [];

  const imageElements = document.querySelectorAll("img[srcSet]");

  imageElements.forEach((imgElement) => {
    const src = imgElement.getAttribute("srcSet");

    if (src && src.includes(BASE_URL)) {
      urls.push(
        src.split("\n")[0]!.replace("//", "https://").replace(" 1x,", "")
      );
    }
  });

  downloadImages(urls, folderName);
  console.log(urls);
}

export async function downloadImages(urls: string[], folderName: string) {
  const downloadPromises = urls.map(async (imageUrl) =>
    downloadImage(imageUrl, folderName)
  );

  if (fs.readdirSync(folderName).length > 0) {
    error(`Directory '${folderName}' is not empty!`);
    process.exit();
  }

  info(`Found ${urls.length} ${urls.length > 1 ? "images" : "image"}`);

  if (fs.readdirSync(folderName).length > 0) {
    console.log(`${chalk.red("[")} - ${chalk.red("]")} Directory is not empty`);
    return;
  }

  Promise.all(downloadPromises)
    .then((downloadedPaths) => {
      info(`All images downloaded successfully:`, downloadedPaths.length);
    })
    .catch((error) => {
      error("Error downloading images:", error);
    });
}
