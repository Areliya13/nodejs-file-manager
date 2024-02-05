import { getUserName } from "./src/userName.js";
import { createInterface } from "readline";
import { stdin as input, stdout as output, chdir, cwd } from "node:process";
import os from "node:os";
import { cd, up } from "./src/navigation.js";

const currentState = {
    userName: "",
};

const exit = () => {
    console.log(`Thank you for using File Manager, ${currentState.userName}, goodbye!`);
    process.exit(1);
};

const start = async () => {
    currentState.userName = getUserName(process.argv) || "User";
    console.log(`Welcome to the File Manager, ${currentState.userName}!`);
    const readline = createInterface({ input, output });
    readline.write(chdir(os.homedir()));
    console.log(`You are currently in ${cwd()}`);

    readline.on("line", async (line) => {
        const [command, arg1, arg2] = line.trim().split(" ");

        switch (command) {
            case ".exit":
                exit();
                break;
            case "up":
                up();
                break;
            case "cd":
                cd(arg1);
                break;
            default:
                console.log(`Unknown command ${command}`);
                break;
        }

        console.log(`You are currently in ${process.cwd()}`);
    });

    readline.on("SIGINT", exit);
};

start();
