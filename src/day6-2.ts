import * as readline from "readline";
import reader from "./reader";

export default function(test=false) {

    reader(test, "6", process )

}
// @todo it would be nice to pass this as another readline variable 
const days = 256;
// const fish = []
function process(rl: readline.Interface): void {
    rl.on("line", onLine)
    // rl.on("close", function() {console.log("close")})
}
const FishAges = [0,1,2,3,4,5,6,7,8] as const;
type FishAge = (typeof FishAges)[number]

type FishByAge = {
    [K in FishAge]: number
}

function onLine(data: string) {
    let countUp = 1;
    const fishes: FishAge[] = data.split(",").map(Number).filter(isFishableAge);
    let fishCounter = fishArrayToFishByAge(fishes);
    
    while (countUp <= days) {
        
        fishCounter = shiftFishes(fishCounter);
        // console.log(`After day: ${countUp}:`, fishes);
        countUp++;
        console.log("fish Counter:", fishCounter)
     }
    console.log(countAllFish(fishCounter))
}

function fishArrayToFishByAge(arr: FishAge[]): FishByAge {
    const fishByAge: FishByAge = {
        0: 0,
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        6: 0,
        7: 0,
        8: 0,
    }
    arr.forEach(fish => {
        fishByAge[fish] = fishByAge[fish] + 1
    })

    return fishByAge;
}

function isFishableAge(num: number): num is FishAge {
    return (num >= 0 && num <= 8)
}

function shiftFishes(fishCounter: FishByAge): FishByAge {

    const zeros = fishCounter[0];
    for (const key in fishCounter) {
        const numKey = Number(key)
        if(!isFishableAge(numKey)) {
            throw new Error("waht")
        }
        const nextKey = numKey+1;
        if(isFishableAge(nextKey)) {
            fishCounter[numKey] = fishCounter[nextKey];
        } else {
            // 8's
            fishCounter[numKey] = zeros;
        }
        if (numKey === 6) {
            // add the recycled zeros
            fishCounter[6] += zeros;
        }
        
    }

    return fishCounter
}

function countAllFish(counter: FishByAge) : number {
    let count = 0;
    Object.keys(counter).forEach(age => {
        const num = Number(age)
        if (!isFishableAge(num)) throw new Error("waaah")
        count += counter[num]
    })
    return count
}