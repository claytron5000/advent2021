import * as fs from "fs";
import * as path from "path";
import * as readline from "readline";

type FullWindow = [number, number, number, number, number]
type MeasurementWindow = [number, number, number, number]
type UnknowWindow = number[]
function isFullWindow(window: Partial<FullWindow>): window is FullWindow {
    return window.length === 5
}
function isMeasurementWindow(window: Partial<UnknowWindow>): window is MeasurementWindow {
    return window.length === 4
}

export default function() {
    const inputFile = path.join(__dirname, "../data/day1.txt");

    const rl = readline.createInterface({
        input: fs.createReadStream(inputFile),

    })



    const fullWindow: Partial<FullWindow> = []
    let increaseCounter = 0;

    rl.on("line", function(currentDepth) {
        const depth = Number(currentDepth)

        // shifting through
        if (isFullWindow(fullWindow)) {
            fullWindow.shift()
            fullWindow.push(depth);
            console.log("shifting",fullWindow)
        } else {
            fullWindow.push(depth)
            console.log("filling",fullWindow)
        }

        
        const measureWindow = fullWindow.slice(0,4);
        // measuring
        if (isMeasurementWindow(measureWindow)) {
            const a = (measureWindow[0] + measureWindow[1] + measureWindow[2]);
            const b = (measureWindow[1] + measureWindow[2] + measureWindow[3])
            console.log("a", a)
            console.log("b",b)
            if (b > a) {
                increaseCounter++
            }
            console.log(increaseCounter)
        }

    })
}