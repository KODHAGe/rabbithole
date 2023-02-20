import * as fs from "fs";

const headers = new Headers({
    'Authorization': 'Token ' + process.env.REPLICATE_API_TOKEN,
    'Content-Type': 'application/json'
});

export default (prompt:string, path:string, sequence:number) => {
    console.log("Generate image 📸")
    let next = sequence + 1

    let filepath = path + sequence + ".png"
    console.log("Processing file: " + filepath)

    let body = {
        "version": "15a3689ee13b0d2616e98820eca31d4c3abcd36672df6afce5cb6feb1d66087d",
        "input": {
            "prompt": prompt,
            "negative_prompt":"",
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