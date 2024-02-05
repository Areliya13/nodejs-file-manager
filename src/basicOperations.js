import process from "node:process";
import { access, constants, writeFile } from "node:fs/promises";
import { createReadStream } from "node:fs";
import { extname, join } from "node:path";

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

export const add = async (pathToFile) => {
    const isFilePath = extname(pathToFile);
    if (!isFilePath) {
        console.log("Wrong file name");
        return;
    }

    const filename = join(process.cwd(), pathToFile);

    let hasFile = false;
    try {
        await access(filename, constants.W_OK);
        hasFile = true;
    } catch (e) {}

    if (hasFile) {
        console.log("Operation add failed");
        return;
    }

    await writeFile(filename, "");
    console.log(`File ${pathToFile} created`);
};
