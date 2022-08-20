const connectToMongo = require('./db')
const express = require('express')
const path = require('path');
var cors = require('cors')
connectToMongo();

const app = express()
const port = 5000;

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
app.use(cors())

app.use('/api/doctor', require('./routes/doctor'))
app.use('/users', require('./routes/users'))

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname+'/registration.html'));
})

app.listen(port, () => {
    console.log(`Backed listening at http://localhost:${port}`)
})

