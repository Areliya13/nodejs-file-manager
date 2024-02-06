import { readFile } from "node:fs/promises";
import { resolvePath } from "./utils.js";
import { cwd } from "node:process";
import { createHash } from "node:crypto";

export const hash = async (fileName) => {
    const pathToFile = resolvePath(cwd(), fileName);
    const data = await readFile(pathToFile);
    const hash = createHash("sha256").update(data).digest("hex");
    console.log(hash);
};
