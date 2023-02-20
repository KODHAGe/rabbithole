import get_interpretation from "./script/get_interpretation.js"
import get_generation from "./script/get_generation.js"
import interpret from "./script/interpret_clip.js"
import generate from "./script/generate_img2img.js"

let path = './img/output/'

async function step(sequence:number) {
    console.log("path " + path, "sequence " + sequence)
    let interpretation = await interpret(path, sequence)
    //console.log(interpretation)
    console.log("sleep some")
    await Bun.sleep(5000)
    let prompt = await get_interpretation(path, sequence)
    await prompt
    await generate(await prompt, path, sequence)
    await Bun.sleep(5000)
    await get_generation(path, sequence) /* This one is here for the replicate.com path */
}

for(let sequence = 0; sequence < 10; sequence++) {
    await step(sequence)
    await Bun.sleep(5000)
}