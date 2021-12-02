import * as fs from "fs";
import * as path from "path";
import * as readline from "readline";

const directionCommand =["forward", "down", "up"] as const;
type DirectionCommand = typeof directionCommand[number];
type SubCommand = [DirectionCommand, number];

export default function(test=false) {
    const inputFile = test ? path.join(__dirname, "../data/day2test.txt") : path.join(__dirname, "../data/day2.txt");

    const rl = readline.createInterface({
        input: fs.createReadStream(inputFile),
    
    })

    let forward = 0;
    let down = 0;
    

    rl.on("line", function(data) {
        const submarineCommand: SubCommand =  makeSubCommand(data.split(" "));
        console.log(`go ${submarineCommand[0]}`, submarineCommand[1])
        switch (submarineCommand[0]) {
            case "forward":
                forward += submarineCommand[1];
                break;
            case "down":
                down += submarineCommand[1];
                break;
            case "up":
                down -= submarineCommand[1];
        }
        console.log(forward * down)
    })
}

function makeSubCommand(commandArray: Array<string>): SubCommand {
    const value = Number(commandArray[1]);
    if (isDirection(commandArray[0]) && value > -1) {
        return [commandArray[0], value];
    }

    throw new Error("Not a valid command");

    function isDirection(command: string): command is DirectionCommand {
        return directionCommand.includes(command as DirectionCommand);
    }
}
