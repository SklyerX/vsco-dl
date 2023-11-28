import { UrlValidator } from "../utils/validators/url";
import { downloadImages } from "../utils/functions";
import { error, info } from "../utils/loggers";
import puppeteer from "puppeteer";
import chalk from "chalk";

export default async function download(str: string, options: string) {
  const { success } = UrlValidator.safeParse({
    url: str,
  });

  if (!success) {
    error(
      `Invalid url format! Format should be: ${chalk.magenta(
        "https://vsco.co/<name>/gallery"
      )}`
    );
    process.exit();
  }

  const browser = await puppeteer.launch({
    headless: "new",
  });
  const page = await browser.newPage();

  await page.goto(str);

  const searchResultSelector = ".css-1xzaqs6.e1xqpt600";
  await page.waitForSelector(searchResultSelector);
  await page.click(searchResultSelector);

  let previousHeight = await page.evaluate(() => document.body.scrollHeight);

  while (true) {
    await page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight - 1200);
    });

    await page.waitForTimeout(2000);

    const currentHeight = await page.evaluate(() => document.body.scrollHeight);

    if (currentHeight === previousHeight) {
      break;
    }

    previousHeight = currentHeight;
  }

  info("Reached the bottom of the dynamically loading page.");

  const imageUrls = await page.$$eval("img[srcSet]", (imgElements) => {
    return imgElements.map((img) =>
      img.srcset
        .split("\n")[0]!
        .replace("//", "https://")
        .replace(" 1x,", "")
        .replace("?w=480", "")
    );
  });

  downloadImages(imageUrls, options);

  await browser.close();
}
