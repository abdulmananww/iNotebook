const connectToMongo = require('./db');
const express = require('express')

connectToMongo();

const app = express()
const port = 3002
var cors = require('cors')
 
app.use(cors())
 
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/api/auth',require('./routes/auth'));
app.use('/api/notes',require('./routes/notes'));

app.listen(port, () => {
  console.log(`iNotebook app listening on port at http://localhost:${port}`)
})