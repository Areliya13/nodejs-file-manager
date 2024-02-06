import { access, stat } from "fs/promises";
import { resolve } from "path";

export const resolvePath = (currentPath, changedPath) => {
    return resolve(currentPath, changedPath);
};

export const isExist = async (path) => {
    try {
        await access(path);
        return true;
    } catch (error) {
        return false;
    }
};

export const isNotExist = async (path) => {
    return !(await isExist(path));
};

export const isFile = async (path) => {
    try {
        const stats = await stat(path);
        return stats.isFile();
    } catch (error) {
        return false;
    }
};

export const isDirectory = async (path) => {
    try {
        const stats = await stat(path);
        return stats.isDirectory();
    } catch (error) {
        return false;
    }
};
