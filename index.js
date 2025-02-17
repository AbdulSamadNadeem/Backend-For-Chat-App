const server = require("./app");
const mongoose = require("mongoose");
const port = process.env.PORT || 3000;


mongoose
  .connect(process.env.CONN_STR)
  .then(() => {
    console.log("db connected successfully");
  })
  .catch((err) => {
    console.log(err.message);
  });

server.listen(port, "0.0.0.0", () => {
  console.log("Server is started");
});
