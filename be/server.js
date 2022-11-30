const express = require('express')
const app = express()
const PORT = 8000
const cors = require('cors')

require('./routes/routes')(app);

// allow all cors
const corsConfig = {
    origin: '*'
}
app.use(cors(corsConfig))
/*app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
})*/

app.listen(PORT, () => {
    console.log(`server started on port: ${PORT}`)
})