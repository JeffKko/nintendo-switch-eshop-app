const app = require('./express.js')
const port = process.env.PORT || 8080

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

// $ export PORT=8000  //Mac
// $ set PORT=8000  //Windows
