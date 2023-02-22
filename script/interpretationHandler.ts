import generate from './generate.js'

export default async function (request:Request, path:string, sequence:number) {
    const generation:any = await request.json()
    Bun.write(path + sequence + '.txt', await fetch(generation.output[0]))
    return new Promise((resolve) => {
        console.log(generation.id + " ~~ " + generation.status + " ~~ in " + generation.metrics.predict_time + "s")
        generate(generation.output[0], path, (sequence + 1))
        resolve(generation.id + " ~~ " + generation.status + " ~~ in " + generation.metrics.predict_time + "s")
    });
}