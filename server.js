const express = require("express");
const socketio = require("socket.io");

const http = require("http");
const path = require("path");

const app = express();
const server = http.createServer(app);

const io = socketio(server);

//Set static folder
app.use(express.static(path.join(__dirname, "public")));

//Run for client connections
io.on("connection", (socket) => {
  socket.emit("message", "Welcome to ChatTech");

  //Broadcast when a user connects
  socket.broadcast.emit("message", "A user has Joined  the chat");

  //Runs when  client disconnects
  socket.on("disconnect", () => {
    io.emit("message", "A user has left the chat");
  });

  //Listen for chat messages
  socket.on("chatMessage", (msg) => {
    io.emit("message", msg);
  });
});
const PORT = 4000 || process.env.PORT;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
