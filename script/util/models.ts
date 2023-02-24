import * as fs from "fs";

export const models = {
    generate: {
        stablediffusion: {
            source: "stability-ai/stable-diffusion-img2img",
            version: "15a3689ee13b0d2616e98820eca31d4c3abcd36672df6afce5cb6feb1d66087d",
            input: function(prompt:string, filepath:string) {
                let obj = {
                    "prompt": prompt,
                    "image": "data:image/jpeg;base64," + Buffer.from(fs.readFileSync(filepath)).toString('base64')
                }
                return obj
            }
        },
        openjourney: {
            source: "mbentley124/openjourney-img2img",
            version: "c49a9422a0d4303e6b8a8d2cf35d4d1b1fd49d32b946f6d5c74b78886b7e5dc3",
            input: function(prompt:string, filepath:string) {
                let obj = {
                    "prompt": prompt,
                    "image": "data:image/jpeg;base64," + Buffer.from(fs.readFileSync(filepath)).toString('base64'),
                    "negative_prompt":"longbody, lowres, bad anatomy, bad hands, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality"
                }
                return obj
            }
        },
        stablediffusion2: {
            source: "cjwbw/stable-diffusion-img2img-v2.1",
            version: "650c347f19a96c8a0379db998c4cd092e0734534591b16a60df9942d11dec15b",
            input: function(prompt:string, filepath:string) {
                let obj = {
                    "prompt": prompt,
                    "image": "data:image/jpeg;base64," + Buffer.from(fs.readFileSync(filepath)).toString('base64')
                }
                return obj
            }
        },
        controlnethed: {
            source: "jagilley/controlnet-hed",
            version: "cde353130c86f37d0af4060cd757ab3009cac68eb58df216768f907f0d0a0653",
            input: function(prompt:string, filepath:string) {
                let obj = {
                    "prompt": prompt,
                    'a_prompt': "best quality, extremely detailed",
                    'n_prompt': "longbody, lowres, bad anatomy, bad hands, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality",
                    'detect_resolution': 512,
                    "input_image": "data:image/jpeg;base64," + Buffer.from(fs.readFileSync(filepath)).toString('base64')
                }
                return obj
            }
        }
    },
    interpret: {
        clip_prefix_caption: {
            source: "rmokady/clip_prefix_caption",
            version: "9a34a6339872a03f45236f114321fb51fc7aa8269d38ae0ce5334969981e4cd8",
            input: function(filepath:string) {
                let obj = {
                    "image": "data:image/jpeg;base64," + Buffer.from(fs.readFileSync(filepath)).toString('base64')
                }
                return obj
            }
        },
        img2prompt: {
            source: "methexis-inc/img2prompt",
            version: "50adaf2d3ad20a6f911a8a9e3ccf777b263b8596fbd2c8fc26e8888f8a0edbb5",
            input: function(filepath:string) {
                let obj = {
                    "image": "data:image/jpeg;base64," + Buffer.from(fs.readFileSync(filepath)).toString('base64')
                }
                return obj
            }
        },
        clip_interrogator: {
            source: "pharmapsychotic/clip-interrogator",
            version: "a4a8bafd6089e1716b06057c42b19378250d008b80fe87caa5cd36d40c1eda90",
            input: function(filepath:string) {
                let obj = {
                    "image": "data:image/jpeg;base64," + Buffer.from(fs.readFileSync(filepath)).toString('base64'),
                    "mode": "fast",
                    "clip_model_name": "ViT-L-14/openai"
                }
                return obj
            }
        }
    }
}