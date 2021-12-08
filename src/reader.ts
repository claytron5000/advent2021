import * as fs from "fs";
import * as path from "path";
import * as readline from "readline";

export default async function (test=false, day: string, func: (rl: readline.Interface) => void) {
    const inputFile = test ? path.join(__dirname, `../data/day${day}test.txt`) : path.join(__dirname, `../data/day${day}.txt`);

    const rl = readline.createInterface({
        input: fs.createReadStream(inputFile),
    
    })
    func(rl);
}