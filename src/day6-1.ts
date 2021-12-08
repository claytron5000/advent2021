import * as readline from "readline";
import reader from "./reader";

export default function(test=false) {

    reader(test, "6", process )

}
// @todo it would be nice to pass this as another readline variable 
const days = 80;
// const fish = []
function process(rl: readline.Interface): void {
    rl.on("line", onLine)
    // rl.on("close", function() {console.log("close")})
}

function onLine(data: string) {
    let countUp = 1;
    let fishes = data.split(",").map(Number);
    let newFish = 0;
    // console.log("Initial: ", data);
    while (countUp <= days) {
        
        fishes = fishes.map(fish => {
            fish--;
            // console.log(fish)
            if (fish < 0) {
                newFish++
                return 6;
            }
            return fish;
        })
        // console.log("add:", newFish)
        const newFishes = Array.from(Array(newFish)).map(() => 8);
        newFish = 0;
        // console.log("new Fishes:",newFishes)
        fishes = fishes.concat(newFishes)
        // console.log(`After day: ${countUp}:`, fishes);
        countUp++;
        console.log("total fishes:", fishes.length)
     }
     
}