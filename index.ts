import interpret from "./script/interpret.js"

const path = process.env.FILE_PATH as string

await interpret(path, 0, 5)