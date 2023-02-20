import * as fs from "fs";

const headers = new Headers({
    'Authorization': 'Token ' + process.env.REPLICATE_API_TOKEN,
    'Content-Type': 'application/json'
});

export default (path:string, sequence:number) => {    
    console.log("🌠 Interpret image") 

    let filepath = path + sequence + ".png"
    console.log("Processing file: " + filepath)

    /*
    Interpretation options via Replicate

    rmokady/clip_prefix_caption | rapid, no style info
    9a34a6339872a03f45236f114321fb51fc7aa8269d38ae0ce5334969981e4cd8

    methexis-inc/img2prompt | slowish but good
    50adaf2d3ad20a6f911a8a9e3ccf777b263b8596fbd2c8fc26e8888f8a0edbb5

    pharmapsychotic/clip-interrogator | medium, changeable...
    a4a8bafd6089e1716b06057c42b19378250d008b80fe87caa5cd36d40c1eda90
    */

    console.log('run clip-interrogator')

    let body = {
        "version": "a4a8bafd6089e1716b06057c42b19378250d008b80fe87caa5cd36d40c1eda90",
        "input": {
            "image": "data:image/png;base64," + Buffer.from(fs.readFileSync(filepath)).toString('base64'),
            "mode": "fast", //for clip-interrogator, default "best"
            "clip_model_name": "ViT-L-14/openai" //for clip-interrogator, stable diffusion 2 ViT-H-14/laion2b_s32b_b79k
        }
    }

    let request = new Request('https://api.replicate.com/v1/predictions', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(body)
    });

    return fetch(request)
    .then((response) => {
        console.log(response)
        return response.statusText
    })
}