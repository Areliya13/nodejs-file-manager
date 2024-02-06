export const operationFailed = (operation) => {
    return `Operation ${operation} failed`;
};

export const operationCompleted = (operation) => {
    return `Operation ${operation} completed`;
};

export const wrongFileName = (pathToFile) => {
    return `Wrong file name ${pathToFile}`;
};

export const wrongFolderName = (pathToFolder) => {
    return `Wrong folder name ${pathToFolder}`;
};
