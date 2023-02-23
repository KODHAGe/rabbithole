import generate from "./script/generate.js"

const path = process.env.FILE_PATH as string

// It starts with - file path, index and maximum iterations
await generate("cool icy nicey",path, 0, 1)