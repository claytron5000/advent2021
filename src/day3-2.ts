import { ResolveWithTtlOptions } from "dns";
import * as fs from "fs";
import * as path from "path";
import * as readline from "readline";


export default async function (test=false) {
    const inputFile = test ? path.join(__dirname, "../data/day3test.txt") : path.join(__dirname, "../data/day3.txt");

    const rl = readline.createInterface({
        input: fs.createReadStream(inputFile),
    
    })
   
    const rows: number[][] = await readIntoRows(rl);
    // const endRow = narrowRows(rows, false)
    // console.log("Oxygen", arrayToDecimal(endRow))
    // console.log("first", getRowsByIndex(rows, 0, false))
    const Oxy = narrowRows(rows, true);
    const Co2 = narrowRows(rows, false);
    console.log("total: ",arrayToDecimal(Oxy) * arrayToDecimal(Co2));
 
}

function narrowRows(rows: number[][], oxy: boolean) {
    let savedRows = rows;
    for (const index in rows[0]) {
        savedRows = getRowsByIndex(savedRows, Number(index), oxy);
        if (savedRows.length === 1) {
            break;
        }
        // console.log("col index", index);
        // console.log("rows", savedRows);
    }
    return savedRows[0]
}

function getRowsByIndex(rows: number[][], columnIndex: number, oxy: boolean): number[][] {
    const ones = [];
    const zeros = [];
    let sum = 0;
    for (const index in rows) {
        const row = rows[index];
        sum += row[columnIndex];
        if (row[columnIndex] === 1) {
            ones.push(row);
        }
        else if (row[columnIndex] === 0) {
            zeros.push(row);
        }
    }
    const comparer = oxy ? sum >= rows.length/2 : sum < rows.length/2;
    return  comparer ? ones : zeros;

}

function getOxygenGenerator(rows: Array<Array<number>>): Array<number> {
    
    // loop all row lengths
    for (let rowIndex=0;rowIndex<rows[0].length; rowIndex++) {
        let columnSum = 0;
        //loop the columns
        for (let columnIndex=0;columnIndex<rows.length; columnIndex++) {
            const val = rows[columnIndex][rowIndex];
            columnSum += val;
        }
        console.log("row number", rowIndex)
        if (columnSum >= rows.length/2) {
            console.log("keep the 1's")
        }
        
    }


    return [];
}

function readIntoRows(rl: readline.Interface): Promise<number[][]> {
    const rows: number[][] =[];

    return new Promise((resolve, reject) => {
        rl.on("line", function(data) {
            const rowArray = data.split("").map(Number)
            rows.push(rowArray);

        });
        rl.on("close", function() {
            resolve(rows);
        })
    })
}

function arrayToDecimal(diagnostic: number[]): number {
    return parseInt(diagnostic.join(""), 2)
}

function readIntoColumns(rl: readline.Interface): Promise<number[][]> {
    let completeDataSet: Array<Array<number>> = [];
    
    return new Promise((resolve, reject) => { 
        rl.on("line", function(data) {
            const diagnostic = data.split("").map(Number)
            if (!completeDataSet.length) {
                completeDataSet = Array.apply([], Array(diagnostic.length)).map(i => []);
            }
            for (const index in diagnostic) {
                completeDataSet[index].push(diagnostic[index]);
            }
            console.log("current data", completeDataSet)
        })
        rl.on("close", function() {
            resolve(completeDataSet);
        })
        
    });
}
