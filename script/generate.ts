import * as fs from "fs";

const headers = new Headers({
    'Authorization': 'Token ' + process.env.REPLICATE_API_TOKEN,
    'Content-Type': 'application/json'
});

export default async function(prompt:string, path:string, sequence:number, iterations:number) {
    return new Promise((resolve) => {
        console.log("Generate image 📸")    
        let filepath = path + sequence + ".jpeg"
        console.log("Processing file: " + filepath)
    
        /*
        stability-ai/stable-diffusion-img2img
        15a3689ee13b0d2616e98820eca31d4c3abcd36672df6afce5cb6feb1d66087d
    
        mbentley124/openjourney-img2img
        c49a9422a0d4303e6b8a8d2cf35d4d1b1fd49d32b946f6d5c74b78886b7e5dc3
    
        cjwbw/stable-diffusion-img2img-v2.1
        650c347f19a96c8a0379db998c4cd092e0734534591b16a60df9942d11dec15b

        jagilley/controlnet-hed
        cde353130c86f37d0af4060cd757ab3009cac68eb58df216768f907f0d0a0653    
    
        */
    
        let body = {
            "version": "c49a9422a0d4303e6b8a8d2cf35d4d1b1fd49d32b946f6d5c74b78886b7e5dc3",
            "input": {
                "prompt": prompt,
                "negative_prompt":"",
                "image": "data:image/jpeg;base64," + Buffer.from(fs.readFileSync(filepath)).toString('base64')
            },
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