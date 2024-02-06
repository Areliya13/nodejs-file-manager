import { cwd } from "node:process";
import { rename, writeFile, rm as remove } from "node:fs/promises";
import { createReadStream, createWriteStream } from "node:fs";
import { resolvePath } from "./utils.js";
import { basename } from "node:path";
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

export const cp = async (fileName, dirname) => {
    const pathFrom = resolvePath(cwd(), fileName);
    const baseName = basename(pathFrom);
    const pathTo = resolvePath(resolvePath(cwd(), dirname), baseName);
    const readStream = createReadStream(pathFrom, "utf8");
    const writeStream = createWriteStream(pathTo, { flags: "wx" });
    await pipeline(readStream, writeStream);
};

export const mv = async (fileName, dirName) => {
    // const pathFrom = resolvePath(cwd(), fileName);
    // const pathTo = resolvePath(cwd(), dirName);
    await cp(fileName, dirName);
    await rm(fileName);
};

export const rm = async (fileName) => {
    const pathToFile = resolvePath(cwd(), fileName);
    await remove(pathToFile);
};
