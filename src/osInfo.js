import { EOL, cpus, homedir, userInfo, arch } from "node:os";

export const os = async (flag) => {
    switch (flag) {
        case "--EOL":
            console.log(JSON.stringify(EOL));
            break;
        case "--cpus":
            const cpusInfo = cpus().map((item) => ({ Model: item.model, Speed: item.speed }));
            console.log(`Total number of CPUs is ${cpusInfo.length}`);
            console.table(cpusInfo);
            break;
        case "--homedir":
            console.log(homedir());
            break;
        case "--username":
            console.log(userInfo().username);
            break;
        case "--architecture":
            console.log(arch());
            break;
        default:
            console.log("Unknown flag");
            break;
    }
};
