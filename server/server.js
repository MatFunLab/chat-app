const path = require("path");
const http = require("http");
const express = require("express");
const socketIO = require("socket.io");
const {generateMessage} = require("./utils/message");

const publicPath = path.join(__dirname, "../public");
const port = process.env.PORT || 3000

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(publicPath));

io.on("connection", (socket) => {
  console.log("new user connected");

  socket.emit("newMessage", generateMessage("Admin", "Welcome to chat-app"));
  socket.broadcast.emit("newMessage", generateMessage("Admin", "New user joined"));

  socket.on("createMessage", (message, callback) => {
      io.emit("newMessage", generateMessage(message.from, message.text));
      callback();
  });

  socket.on("createLocationMessage", (data) => {
    socket.broadcast.emit("sendLocation", {
      street: data.locationMessage
    });
  })

  socket.on("disconnect", () => {
    console.log("disconnected");

  });
});

server.listen(port, () => {
  console.log(`server up on port ${port}`);
});
