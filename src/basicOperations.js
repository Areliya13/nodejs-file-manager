import process from "node:process";
import { access, constants, rename, writeFile } from "node:fs/promises";
import { createReadStream, createWriteStream } from "node:fs";
import { extname, join, parse } from "node:path";

export const cat = async (pathToFile) => {
    const isFile = extname(pathToFile);
    if (!isFile) {
        console.log("Wrong file name");
        return;
    }
    try {
        await access(pathToFile, constants.R_OK);
    } catch (e) {
        console.log("Can't read the file");
        return;
    }

    try {
        const readableStream = createReadStream(pathToFile);
        readableStream.pipe(process.stdout);
    } catch (e) {
        console.log("Operation cat failed");
    }
};

export const add = async (fileName) => {
    const isFile = extname(fileName);
    if (!isFile) {
        console.log("Wrong file name");
        return;
    }

    const pathToFile = join(process.cwd(), fileName);

    let fileExist = false;
    try {
        await access(pathToFile, constants.W_OK);
        fileExist = true;
    } catch (e) {}

    if (fileExist) {
        console.log("Operation add failed");
        return;
    }

    await writeFile(pathToFile, "");
    console.log(`File ${fileName} created`);
};

export const rn = async (pathToFile, newFilename) => {
    const newPathToFile = join(parse(pathToFile).dir, newFilename);
    try {
        await rename(pathToFile, newPathToFile);
        console.log(`File ${pathToFile} renamed to ${newFilename}`);
    } catch (e) {
        console.log("Operation rn failed");
    }
};
