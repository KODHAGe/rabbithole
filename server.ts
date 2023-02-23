// POST endpoints for handling webhook input
import generationHandler from './script/generationHandler.js'
import interpretationHandler from './script/interpretationHandler.js'

// GET endpoints for showing stuff on screen

// Define routes
const paths = {
    get: [
        {path: '', handler: function() {
            return '<3'
        }}
    ],
    post: [
        {path: 'generation', handler: (req:Request, path:string, sequence:number, iterations:number) => generationHandler(req, path, sequence, iterations)},
        {path: 'interpretation', handler: (req:Request, path:string, sequence:number,  iterations:number) => interpretationHandler(req, path, sequence, iterations)}
    ]
}

const filepath = process.env.FILE_PATH as string

export default {
    port: 3000,
    async fetch(req:Request) {
        let method = req.method,
            url = new URL(req.url),
            path = url.pathname, // for handling routing
            dryrun = url.searchParams.get('dry'), // dry run = run without generation/interpretation
            sequence = Number(url.searchParams.get('seq')), // current nr in sequence
            iterations = Number(url.searchParams.get('n')),
            response:any
        
        /* ~~~~handle post paths~~~~ */
        if (method == "POST") {
            for (const element of paths.post) {
                if(path == ('/' + element.path)) {
                    if(dryrun == 'true'){
                        response = '<3 dry run <3'
                    } else {
                        response = await element.handler(req, filepath, sequence, iterations)
                    }
                    break;
                } else {
                    response = "404 nuhh"
                }
            }

        /* ~~~~kill all else~~~~ */
        } else {
            response = "invalid nuhh"
        }

        return new Response(response)
    }
  };