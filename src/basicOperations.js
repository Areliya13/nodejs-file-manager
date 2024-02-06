import { cwd, stdout } from "node:process";
import { access, constants, rename, writeFile } from "node:fs/promises";
import { createReadStream, createWriteStream } from "node:fs";
import { extname, join, parse } from "node:path";
import { isFile, resolvePath } from "./utils.js";
import { messages } from "./messages.js";
import { pipeline } from "node:stream/promises";

export const cat = async (fileName) => {
    const pathToFile = resolvePath(cwd(), fileName);
    return new Promise((res, rej) => {
        const readableStream = createReadStream(pathToFile, "utf8");
        readableStream.on("error", rej);
        readableStream.on("data", console.log);
        readableStream.on("end", res);
    });
};

export const add = async (fileName) => {
    const pathToFile = resolvePath(cwd(), fileName);
    await writeFile(pathToFile, "", { flag: "wx" });
};

export const rn = async (oldFileName, newFilename) => {
    const fromPath = resolvePath(cwd(), oldFileName);
    const toPath = resolvePath(cwd(), newFilename);
    await rename(fromPath, toPath);
};
