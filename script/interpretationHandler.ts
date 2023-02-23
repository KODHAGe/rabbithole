import generate from './generate.js'

export default async function (request:Request, path:string, sequence:number, iterations:number) {
    const generation:any = await request.json()
    console.log("interpretation" +generation.output)
    Bun.write(path + sequence + '.txt', generation.output)
    return new Promise((resolve) => {
        console.log(generation.id + " ~~ " + generation.status + " ~~ in " + generation.metrics.predict_time + "s")
        generate(generation.output, path, sequence, iterations)
        resolve(generation.id + " ~~ " + generation.status + " ~~ in " + generation.metrics.predict_time + "s")
    });
}