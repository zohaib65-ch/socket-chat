const express = require("express");
const { createServer } = require("node:http");
const path = require("path");
const app = express();
const server = createServer(app);
const { Server } = require("socket.io");

const io = new Server(server);
app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "public", "index.html"));
});
io.on("connection", (socket) => {
  socket.on("chat message", (message) => {
    io.emit("New Message", message);
  });
});

app.use(express.static(path.resolve(__dirname, "public")));

server.listen(3000, () => {
  console.log("server running at http://localhost:3000");
});
