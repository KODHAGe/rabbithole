let headers = new Headers({
    'Authorization': 'Token ' + process.env.REPLICATE_API_TOKEN,
});

let request = new Request('https://api.replicate.com/v1/predictions', {
    method: 'GET',
    headers: headers
});

export default (path:string, sequence: number) => {
    console.log("Get generation 📟")
    return fetch(request)
    .then((response) => response.json())
    .then((json:any) => {
        console.log(json.results[0].output[0])
        fetch(json.results[0].output[0])
        .then((response) => {
            Bun.write(path + (sequence + 1) + '.jpeg', response)
        })
        return <string>json.results[0].output
    })
}