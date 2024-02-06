import { resolvePath } from "./utils.js";
import { cwd } from "node:process";
import { createReadStream, createWriteStream } from "node:fs";
import { createBrotliCompress, createBrotliDecompress } from "node:zlib";
import { pipeline } from "node:stream/promises";

export const compress = async (fileToCompress, archive) => {
    const pathFrom = resolvePath(cwd(), fileToCompress);
    const pathTo = resolvePath(cwd(), archive);
    if (!isFile(pathFrom)) throw new Error("Error!");
    const readableStream = createReadStream(pathFrom);
    const writableStream = createWriteStream(pathTo, { flags: "wx" });
    const transformStream = createBrotliCompress();
    await pipeline(readableStream, transformStream, writableStream);
};

export const decompress = async (archive, fileName) => {
    const pathFrom = resolvePath(cwd(), archive);
    const pathTo = resolvePath(cwd(), fileName);
    if (!isFile(pathFrom)) throw new Error("Error!");
    const readableStream = createReadStream(pathFrom);
    const writableStream = createWriteStream(pathTo, { flags: "wx" });
    const transformStream = createBrotliDecompress();
    await pipeline(readableStream, transformStream, writableStream);
};
