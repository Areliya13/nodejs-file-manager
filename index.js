import { getUserName } from "./src/userName.js";
import { createInterface } from "readline";
import { stdin, stdout, chdir, cwd } from "node:process";
import os from "node:os";
import { cd, ls, up } from "./src/navigation.js";
import { add, cat, cp, mv, rn, rm } from "./src/basicOperations.js";
import { messages } from "./src/messages.js";

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
    const readline = createInterface({ input: stdin, output: stdout });
    readline.write(chdir(os.homedir()));
    console.log(`You are currently in ${cwd()}`);

    readline.on("line", async (line) => {
        const [command, arg1, arg2] = line.trim().split(" ");
        try {
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
                case "ls":
                    await ls();
                    break;
                case "cat":
                    await cat(arg1);
                    break;
                case "add":
                    await add(arg1);
                    break;
                case "rn":
                    await rn(arg1, arg2);
                    break;
                case "cp":
                    await cp(arg1, arg2);
                    break;
                case "mv":
                    await mv(arg1, arg2);
                    break;
                case "rm":
                    await rm(arg1);
                    break;
                default:
                    console.log(`Unknown command ${command}`);
                    throw new Error("Error! Unknown command!");
            }

            console.log(messages.OperationSuccess);
        } catch (error) {
            console.log(messages.OperationFailed);
            // console.log(error.toString());
        }
        console.log(`You are currently in ${process.cwd()}`);
    });

    readline.on("SIGINT", exit);
};

start();
