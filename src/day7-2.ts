import reader from "./reader";
import * as readline from "readline";

export default function(test=false) {

    reader(test, "7", process )

}

function process(rl: readline.Interface) {
    rl.on("line", function(data) {

        const arr = data.split(",").map(Number);
        console.log(arr)
        // no need to sort for averages
        // const sorted =  arr.sort((f,s) => f < s ? -1 : 1);
        const sum = arr.reduce((sum, num) => sum+num);
        const average = Math.round(sum/arr.length)-1;
        const distances = arr.map(num => Math.abs(num - average))
        const expenses = distances.map(dist => getExpandingValue(dist))
        console.log("total:", expenses.reduce((s,n) => s+n))
        
    })
}

function getExpandingValue(num: number) {
    let sum = 0;
    for (let i=1; i<=num; i++) {
        sum += i;
    }
    return sum;
}