import * as fs from "fs";

const headers = new Headers({
    'Authorization': 'Token ' + process.env.REPLICATE_API_TOKEN,
    'Content-Type': 'application/json'
});

export default (path:string, sequence:number) => {    
    console.log("🌠 Interpret image") 

    let filepath = path + sequence + ".png"
    console.log("Processing file: " + filepath)

    let body = {
        "version": "50adaf2d3ad20a6f911a8a9e3ccf777b263b8596fbd2c8fc26e8888f8a0edbb5",
        "input": {
            "image": "data:image/png;base64," + Buffer.from(fs.readFileSync(filepath)).toString('base64')
        }
    }

    let request = new Request('https://api.replicate.com/v1/predictions', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(body)
    });

    return fetch(request)
    .then((response) => {
        console.log(response.statusText)
        return response.statusText
    })
}