export const getUserName = (allArgs) => {
    for (let i = 0; i < allArgs.length; i++) {
        const arg = allArgs[i];
        if (arg.startsWith("--username=")) {
            return arg.slice(11);
        }
    }
    return null;
};
