import * as readline from "readline";
import day12 from "./day1-2";
import day11 from "./day1-1";
import day21 from "./day2-1";
import day22 from "./day2-2";

const functionMap: Record<string, (test?: boolean)=> void>= {
    "1:1": day11,
    "1:2": day12,
    "2:1": day21,
    "2:2": day22
}

const rl = readline.createInterface({input: process.stdin, output: process.stdout})

rl.question(`What day to run?`, day => {
    if (typeof Number(day) !== "number") {
        console.log("Day needs to be a number");
    }
    rl.question(`Which problem?`, problem => {
        if (![1,2].includes(Number(problem))) {
            console.log("Problem needs to be a one or two");
            rl.close()
        }
        rl.question(`Test Data y/n?`, test => {
            
            const functionKey = day + ":" + problem;
            const func = functionMap[functionKey];
            console.log(`Running day ${day}, problem number ${problem}`)
            func(test.toLowerCase() === 'y');
            rl.close()
        })

    })
    
})