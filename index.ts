import get_interpretation from "./script/get_interpretation.js"
import interpret from "./script/interpret.js"
import generate from "./script/generate.js"

let path = './img/output/'

async function step(sequence:number) {
    console.log("path " + path, "sequence " + sequence)
    let interpretation = interpret(path, sequence)
    console.log(interpretation)
    console.log("sleep some")
    await Bun.sleep(30000)
    let prompt = get_interpretation(path, sequence)
    await prompt
    generate(await prompt, path, sequence)
    await Bun.sleep(10000)
}

for(let sequence = 0; sequence < 5; sequence++) {
    await step(sequence)
}