import * as fs from "fs";
import * as path from "path";
import * as readline from "readline";


export default function(test = false) {
    const inputFile = test ? path.join(__dirname, "../data/day1test.txt") : path.join(__dirname, "../data/day1.txt");

    const rl = readline.createInterface({
        input: fs.createReadStream(inputFile),
    
    })
    
    let lastDepth = 0;
    let increaseCounter = 0;
    rl.on("line", function(currentDepth) {
        const depth = Number(currentDepth)
        if (lastDepth) {
            // console.log(depth < lastDepth ? "increase": "decrease")
            if (depth > lastDepth) { increaseCounter++}
            lastDepth = depth;
        }
        else {
            lastDepth = depth;
        }
        console.log("counter", increaseCounter)
    })
}