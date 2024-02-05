import { getUserName } from "./args/userName.js";

const currentState = {
    userName: "",
};

const start = async () => {
    currentState.userName = getUserName(process.argv) || "User";
    console.log(`Welcome to the File Manager, ${currentState.userName}!`);
};

start();
