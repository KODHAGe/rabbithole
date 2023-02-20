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

    /*
    stability-ai/stable-diffusion-img2img
    15a3689ee13b0d2616e98820eca31d4c3abcd36672df6afce5cb6feb1d66087d

    mbentley124/openjourney-img2img
    c49a9422a0d4303e6b8a8d2cf35d4d1b1fd49d32b946f6d5c74b78886b7e5dc3

    cjwbw/stable-diffusion-img2img-v2.1
    650c347f19a96c8a0379db998c4cd092e0734534591b16a60df9942d11dec15b

    */

    console.log('run stable diffusion')
    let body = {
        "version": "650c347f19a96c8a0379db998c4cd092e0734534591b16a60df9942d11dec15b",
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