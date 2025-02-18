const express = require("express");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const Router = require("./Routes/Routes");
const http = require('http')

app.use(express.json());

const server = http.createServer(app)
const io = require('socket.io')(server , {
    cors:{
        origin:'https://chit-shat-abdulsamadnadeems-projects.vercel.app',
        methods:['GET','POST']
    }
})
app.use(express.urlencoded({extended:true}))
app.use(cors(
  {origin:'https://chit-shat-abdulsamadnadeems-projects.vercel.app'}
));
app.use(morgan("dev"));
app.use("/chitshat", Router);

io.on('connection' , socket=>{
   socket.on('join-room' , userid=>{
     socket.join(userid)
   })
   socket.on('send-message' , (message)=>{
      io.to(message.members[0]).to(message.members[1]).emit('recieve-message' , message)
   })
   socket.on('typing' , (data)=>{
    io.to(data.members[0]).to(data.members[1]).emit('started' , data)
   })
})

module.exports = server;
