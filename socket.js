// api/socket.js
const { Server } = require("socket.io");

const setupSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "https://chit-shat.vercel.app", // Allow the frontend to connect
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("A user connected");

    socket.on("join-room", (userid) => {
      socket.join(userid); // Join a specific room for the user
    });

    socket.on("send-message", (message) => {
      // Broadcast the message to the members of the conversation
      io.to(message.members[0])
        .to(message.members[1])
        .emit("receive-message", message);
    });

    socket.on("typing", (data) => {
      // Notify both members that someone is typing
      io.to(data.members[0])
        .to(data.members[1])
        .emit("started", data);
    });

    socket.on("disconnect", () => {
      console.log("A user disconnected");
    });
  });

  return io;
};

module.exports = setupSocket;
