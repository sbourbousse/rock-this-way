import express from 'express';
//const db = require('./Class/Database');
const mongoose = require("mongoose")
const user = require('./routes/users')
const bodyParser = require('body-parser');
const app = express()
const port = process.env.PORT || 3000;


app.use(bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 


const prefix = 'mongodb+srv'
const server = 'sylvain:tiy9mcn@cluster0.0x34i.mongodb.net';
const database = 'rockthisway';
const options = '?retryWrites=true&w=majority'

mongoose.connect(`${prefix}://${server}/${database}${options}`)
.then(() => {
  console.log('Database connection successful')
})
.catch(() => {
  console.error('Database connection error')
})

app.use('/user', user);

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})