import interpret from './interpret.js'

export default async function (request:Request, path:string, sequence:number, iterations:number) {
    const generation:any = await request.json()
    sequence = sequence + 1
    fetch(generation.output[0]).then((result) => {
        Bun.write(path + sequence + '.jpeg', result).then(() => {
            return new Promise((resolve) => {
                console.log(generation.id + " ~~ " + generation.status + " ~~ in " + generation.metrics.predict_time + "s")
                if(sequence <= iterations) {
                    interpret(path, sequence, iterations)
                }
                resolve(generation.id + " ~~ " + generation.status + " ~~ in " + generation.metrics.predict_time + "s")
            });
        })
    })
}