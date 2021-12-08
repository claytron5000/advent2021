import * as readline from "readline";
import reader from "./reader";

export default function(test=false) {

    reader(test, "4",process )

}

type Card = {
    rows: number[][],
    columns: number[][],
    winnerCallArray: number[],
}

let calls: number[] = [];
let winningCard: Card;
let currentCard: Card;

function process(rl: readline.Interface): void {
    rl.on("line", function(data) {
        // bingo calls
        if (!calls.length) {
            calls = data.split(",").map(Number);
        }
        // reset to an empty current card
        else if(!data.length) {
            // console.log("empty")
            if (currentCard) {
                // console.log("full card")
                const filled = fillWinnerArray(calls, currentCard);
                if (!winningCard) {
                    winningCard = filled;
                    // console.log("winner empty")
                }
                // console.log("current winner:", winningCard.winnerCallArray.length)
                // console.log("contender:", filled.winnerCallArray.length)
                if (winningCard.winnerCallArray.length < filled.winnerCallArray.length) {
                    winningCard = filled;
                }
            }
            currentCard = {
                rows: [],
                columns: [[],[],[],[],[]],
                winnerCallArray: []
            }
        } 
        // fill the current card
        else {
            const rowArray = data.split(" ").filter(it => it).map(Number)
            currentCard.rows.push(rowArray);
            currentCard.columns = currentCard.columns.map((arr,index) => {
                return arr.concat(rowArray[index]);
            })
        }
        // console.log(currentCard);
    })
    rl.on("close", function() {
        console.log("winning Card", winningCard);
        console.log(calculateWinValue(winningCard));
    })
}
    
export function setInSet(smallSet: Set<number>, largeSet: Set<number>) {
    if (smallSet.size > largeSet.size) return false;
    for (const a of smallSet) if (!largeSet.has(a)) return false;
    return true;
}

function calculateWinValue(card: Card) {
    const callSet = new Set(card.winnerCallArray);
    const remains = [...card.rows.flat()].filter(x => !callSet.has(x));
    console.log("remain",remains)
    const sum = remains.reduce((sum, cur) => sum+cur);
    return sum * card.winnerCallArray[card.winnerCallArray.length-1]
}

function fillWinnerArray(calls: number[], card: Card): Card {

    for (const num in calls) {
        // console.log("index:", num);
        const currentCallSet = new Set(calls.slice(0, Number(num)));
        // console.log(currentCallSet);
        for (const arr of card.columns.concat(card.rows)) {
            // console.log("row or column array: ",arr)
            if (setInSet(new Set(arr), currentCallSet)) {
                card.winnerCallArray = Array.from(currentCallSet);
                break;
            }
        }
        if (card.winnerCallArray.length) break;
    }
    return card;
}