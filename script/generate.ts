import { models } from "./util/models.js";

const headers = new Headers({
    'Authorization': 'Token ' + process.env.REPLICATE_API_TOKEN,
    'Content-Type': 'application/json'
});

export default async function(prompt:string, path:string, sequence:number, iterations:number) {
    return new Promise((resolve) => {
        console.log("Generate image 📸")    
        let filepath = path + sequence + ".jpeg"
        console.log("Processing file: " + filepath)
    
        let body = {
            "version": models.generate.openjourney.version,
            "input": models.generate.openjourney.input(prompt,filepath),
            "webhook": process.env.SERVER_URL + "generation?seq=" + sequence + "&n=" + iterations,
            "webhook_events_filter": ["completed"]
        }
    
        let request = new Request('https://api.replicate.com/v1/predictions', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(body)
        });
    
        fetch(request)
        .then((response) => {
            console.log("~~~ set webhook for " + process.env.SERVER_URL + "generation?seq=" + sequence + "&n=" + iterations+ " ~~~")
            console.log("~~~ "+ response.statusText+" ~~~")
            resolve(response.statusText)
        })
    })
}