const { Server } = require("socket.io");

const setupSocket = (server) => {
  const io = new Server(server, {
    cors: "*",
  });

  io.on("connection", (socket) => {
    console.log("A user connected");

    socket.on("join-room", (userid) => {
      socket.join(userid);
    });

    socket.on("send-message", (message) => {
      io.to(message.members[0])
        .to(message.members[1])
        .emit("receive-message", message);
    });

    socket.on("typing", (data) => {
      io.to(data.members[0]).to(data.members[1]).emit("started", data);
    });

    socket.on("disconnect", () => {
      console.log("A user disconnected");
    });
  });

  return io;
};

module.exports = setupSocket;
