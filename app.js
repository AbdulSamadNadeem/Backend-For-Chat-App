const express = require("express");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const Router = require("./Routes/Routes");
const http = require('http');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(cors());


app.use(morgan("dev"));


app.use("/chitshat", Router);


const server = http.createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin:'https://chit-shat.vercel.app',
      methods:['GET','POST']
            }
});

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('join-room', (userid) => {
    socket.join(userid);
    console.log(`User joined room: ${userid}`);
  });

  socket.on('send-message', (message) => {
    io.to(message.members[0]).to(message.members[1]).emit('recieve-message', message);
  });

  socket.on('typing', (data) => {
    io.to(data.members[0]).to(data.members[1]).emit('started', data);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected:', socket.id);
  });
});

module.exports = server;
