module.exports = (options) => {
    return (req, res, next) => {
        switch (options.format) {
            case "short":
                console.log(`${req.method} ${req.url}`)
                break
            case "medium":
                console.log(`Method: ${req.method}, URL: ${req.url}, Time: ${new Date().toISOString()}`)
                break
            case "long":
            default:
                console.log(`${new Date().toISOString()} ${req.ip} ${req.method} ${req.url}`)
                break
        }
        next()
    }
}
