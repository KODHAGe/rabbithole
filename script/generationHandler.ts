import interpret from './interpret.js'

export default async function (request:Request, path:string, sequence:number, iterations:number) {
    const generation:any = await request.json()
    Bun.write(path + sequence + '.png', await fetch(generation.output[0]))
    return new Promise((resolve) => {
        console.log(generation.id + " ~~ " + generation.status + " ~~ in " + generation.metrics.predict_time + "s")
        interpret(path, (sequence + 1), iterations)
        resolve(generation.id + " ~~ " + generation.status + " ~~ in " + generation.metrics.predict_time + "s")
    });
}