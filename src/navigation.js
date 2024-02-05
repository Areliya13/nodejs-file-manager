import { cwd, chdir } from "node:process";
import { parse } from "node:path";

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
