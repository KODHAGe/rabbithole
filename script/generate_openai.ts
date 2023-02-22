//Generate via openai dall-e

const headers = new Headers({
    'Authorization': 'Bearer ' + process.env.OPENAI_API_KEY,
    'Content-Type': 'application/json'
});

export default (prompt:string, path:string, sequence:number) => {
    console.log("Generate image 📸")
    let next = sequence + 1

    let body = {
        "prompt": prompt,
        "n": 1,
        "size": "1024x1024"
    }

    let request = new Request('https://api.openai.com/v1/images/generations', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(body)
    });

    return fetch(request)
    .then((response) => response.json())
    .then((json:any) => {
        let url = json.data[0].url
        fetch(url).then((res) => res.blob())
        .then((blob:Blob) => {
            Bun.write(path + next + ".png", blob)
            console.log("Write success!")
            return true
        })
    })
}