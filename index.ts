import interpret from "./script/interpret.js"

const path = process.env.FILE_PATH as string

// It starts with - file path, index and maximum iterations
await interpret(path, 0, 5)