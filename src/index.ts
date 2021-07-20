import express from 'express';
//const db = require('./Class/Database');
const mongoose = require("mongoose")
const user = require('./routes/users')
const bodyParser = require('body-parser');
var cors = require('cors')
const app = express()
const http = require("http").Server(app);
const io = require("socket.io")(http, {
    cors: {
      origin: "*"
    }
});
const port = process.env.PORT || 3000;
let users: any = [];
let messages: any = [];

app.use(bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

var corsOptions = {
  origin: '*'
}

app.use(cors(corsOptions));


const prefix = 'mongodb+srv'
const server = 'sylvain:tiy9mcn@cluster0.0x34i.mongodb.net';
const database = 'gameDb';
const options = '?retryWrites=true&w=majority'

mongoose.connect(`${prefix}://${server}/${database}${options}`)
.then(() => {
  console.log('Database connection successful')
})
.catch(() => {
  console.error('Database connection error')
})

app.use('/user', user);


const ChatSchema = mongoose.Schema({
  username: String,
  msg: String
});

const ChatModel = mongoose.model("messages_tchat", ChatSchema);

ChatModel.find((err: any, result: any) => {
  if (err) throw err;

  messages = result;
});

io.on("connection", (socket: any) => {
  socket.emit('loggedIn', {
      users: users.map((s: any) => s.username),
      messages: messages
  });

  socket.on('newuser', (username: any) => {
      console.log(`${username} has arrived at the party.`);
      socket.username = username;
      
      users.push(socket);

      io.emit('userOnline', socket.username);
  });

  socket.on('msg', (msg: any) => {
      let message = new ChatModel({
          username: socket.username,
          msg: msg
      });

      message.save((err: any, result: any) => {
          if (err) throw err;

          messages.push(result);

          io.emit('msg', result);
      });
  });
  
  // Disconnect
  socket.on("disconnect", () => {
      console.log(`${socket.username} has left the party.`);
      io.emit("userLeft", socket.username);
      users.splice(users.indexOf(socket), 1);
  });
});



http.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})