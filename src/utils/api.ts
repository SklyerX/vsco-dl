import axios from "axios";
import path from "path";
import fs from "fs";
import { error, success } from "./loggers";

export async function downloadImage(url: string, folderPath: string) {
  if (
    fs.existsSync(folderPath) === false ||
    fs.lstatSync(folderPath).isDirectory() === false
  ) {
    fs.mkdirSync(folderPath);
  }

  const fileName = path.basename(url);
  const destinationPath = path.join(folderPath, fileName);

  const response = await axios({
    method: "GET",
    url: url,
    responseType: "arraybuffer", // Specify arraybuffer to get binary data
  });

  try {
    await fs.promises.writeFile(destinationPath, response.data);
    success(`Downloaded: ${url}`);
  } catch (err) {
    error(`Error writing file ${destinationPath}: ${err}`);
  }
}
