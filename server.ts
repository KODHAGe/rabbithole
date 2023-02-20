// POST endpoints for handling webhook input
import generationHandler from './script/generationHandler.js'
import interpretationHandler from './script/interpretationHandler.js'
import webFront from './script/webFront.js'

// GET endpoints for showing stuff on screen

// Define routes
const paths = {
    get: [
        {path: 'generation', handler: generationHandler()},
        {path: 'interpretation', handler: interpretationHandler()},
        {path: '', handler: webFront()},
    ],
    post: [
        {path: 'generation', handler: generationHandler()},
        {path: 'interpretation', handler: interpretationHandler()},
    ]
}

export default {
    port: 3000,
    async fetch(req:any) {
        let method = req.method
        let path = new URL(req.url).pathname
        let response:any;
        
        if (method == "GET") {
            for (const element of paths.get) {
                if(path == ('/' + element.path)) {
                    response = await element.handler
                } else {
                    response = "404 nuhh"
                }
            }
        } else if (method == "POST") {
            for (const element of paths.post) {
                if(path == ('/' + element.path)) {
                    response = await element.handler
                } else {
                    response = "404 nuhh"
                }
            }
        } else {
            response = "invalid nuhh"
        }

        return new Response(response)
    }
  };