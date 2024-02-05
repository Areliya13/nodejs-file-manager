import { cwd, chdir } from "node:process";
import { parse } from "node:path";
import { readdir } from "node:fs/promises";

export const up = () => {
    const currentPath = parse(cwd());
    const root = currentPath.root;
    const dir = currentPath.dir;
    if (root === cwd()) {
        console.log("You can't go upper than root directory ");
    }
    try {
        chdir(dir);
    } catch (e) {
        console.log("Operation up failed");
    }
};

export const cd = (pathToFolder) => {
    try {
        if (pathToFolder.includes(":")) {
            chdir(pathToFolder);
        } else {
            const currentFolder = path.join(cwd(), pathToFolder);
            chdir(currentFolder);
        }
    } catch (e) {
        console.log("Operation cd failed");
    }
};

export const ls = async () => {
    try {
        const listOfNames = await readdir(process.cwd(), { withFileTypes: true });
        const sortedList = [...listOfNames]
            .map((name) => ({
                Name: name.name,
                Type: name.isFile() ? "file" : "directory",
            }))
            .sort((a, b) => b.Name - a.Name)
            .sort((a, b) => a.Type - b.Type);

        console.table(sortedList);
    } catch (e) {
        console.log("Operation ls failed");
    }
};
