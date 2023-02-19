let headers = new Headers({
    'Authorization': 'Token ' + process.env.REPLICATE_API_TOKEN,
});

let request = new Request('https://api.replicate.com/v1/predictions', {
    method: 'GET',
    headers: headers
});

export default (path:string, sequence: number) => {
    console.log("Get interpretation 🖊")
    return fetch(request)
    .then((response) => response.json())
    .then((json:any) => {
        console.log(json.results[0].output)
        Bun.write(path + sequence + '.txt', json.results[0].output)
        return <string>json.results[0].output
    })
}