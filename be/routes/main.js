const fs = require('fs')

module.exports = function (app) {
    function isFolder(path) {
        return fs.lstatSync(path).isDirectory() && fs.existsSync(path)
    }

    app.get('/file', (req, res) => {
        const base = './files/' // folder with files to access
        let path = '' // path to files
        if ('path' in req.query) {
            path = req.query.path
        }
        if (isFolder(base + path)) {
            let files = fs.readdirSync(base + path).map(i => {
                const isDir = fs.lstatSync(base + path + '/' + i).isDirectory()
                let size = 0
                if (!isDir) {
                    size = fs.statSync(base + path + '/' + i)
                }
                return {name: i, dir: isDir, size: size.size ?? 0}
            })
            res.json({path: path, result: true, files: files})
        }
    })
    app.get('/test', (req, res) => {
        res.json('test')
    })
}