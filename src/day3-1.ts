import * as fs from "fs";
import * as path from "path";
import { disconnect } from "process";
import * as readline from "readline";

type Binary = 1 | 0;
type Diagnostic = [Binary, Binary, Binary, Binary, Binary, Binary, Binary, Binary, Binary, Binary, Binary, Binary];

export default function (test=false) {
    const inputFile = test ? path.join(__dirname, "../data/day3test.txt") : path.join(__dirname, "../data/day3.txt");

    const rl = readline.createInterface({
        input: fs.createReadStream(inputFile),
    
    })
   
    let gamma = [0,0,0,0,0,0,0,0,0,0,0,0];
    let epsilon = [0,0,0,0,0,0,0,0,0,0,0,0];
    rl.on("line", function(data) {
        const diagnostic = data.split("").map(Number);
        console.log("line",data)
        if (isDiagnostic(diagnostic)) {
            gamma = gammaFunc(diagnostic, gamma);
            epsilon = epsilonFunc(diagnostic, epsilon);
        } else {
            
            throw new Error("Not a binary");
        }
        console.log("Epsilon", makeNumBinary(epsilon))
        console.log("Gama", makeNumBinary(gamma))
        console.log("ep in dec", arrayToDecimal(makeNumBinary(epsilon)))
        console.log("gam in dec", arrayToDecimal(makeNumBinary(gamma)))
        console.log("tots", arrayToDecimal(makeNumBinary(epsilon)) * arrayToDecimal(makeNumBinary(gamma)))
        
    });
    function arrayToDecimal(diagnostic: Diagnostic): number {
        return parseInt(diagnostic.join(""), 2)
    }
    function gammaFunc(diagnostic: Diagnostic, gamma: number[]): number[] {
        return gamma.map((num, index) => diagnostic[index] ? gamma[index] - 1 : gamma[index] + 1)
    }
    function epsilonFunc(diagnostic: Diagnostic, epsilon: number[]): number[] {
        return epsilon.map((num, index) => diagnostic[index] ? epsilon[index] + 1 : epsilon[index] - 1)
    }
    function makeNumBinary(numbers: number[]): Diagnostic {
        const arr = numbers.map(bin => bin < 0).map(Number);
        if (isDiagnostic(arr)) {
            return arr;
        }
        throw new Error("Trying to return non-binary")
    }
}

// all of this is probably redundant since a string of ones and zeros is already
// a binary string...
function isDiagnostic(numArray: Array<number>): numArray is Diagnostic {
    return numArray.filter(isBinary).length === 12
}

function isBinary(num: number): num is Binary {
    return [0,1].includes(num);
}