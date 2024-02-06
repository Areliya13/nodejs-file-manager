import { cwd, chdir } from "node:process";
import { readdir } from "node:fs/promises";
import { isDirectory, resolvePath } from "./utils.js";

export const up = () => {
    chdir("..");
};

export const cd = (pathToFolder) => {
    const path = resolvePath(cwd(), pathToFolder);
    if (!isDirectory(path)) throw new Error("Error!");
    chdir(path);
};

export const ls = async () => {
    const listOfNames = await readdir(process.cwd(), { withFileTypes: true });
    const sortedList = listOfNames
        .filter((item) => !item.isSymbolicLink())
        .sort((a, b) => a.name - b.name)
        .sort((a, b) => a.isFile() - b.isFile())
        .map((item) => ({ Name: item.name, Type: item.isFile() ? "file" : "directory" }));
    console.table(sortedList);
};
