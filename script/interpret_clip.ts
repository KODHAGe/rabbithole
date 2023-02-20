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
        "version": "9a34a6339872a03f45236f114321fb51fc7aa8269d38ae0ce5334969981e4cd8",
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