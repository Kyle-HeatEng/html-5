const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Store player positions
let playerPositions = {};

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  console.log("A user connected: " + socket.id);

  // Initialize player position
  playerPositions[socket.id] = { x: 50, y: 50 }; // Default starting position

  // Send existing players to the newly connected player
  socket.emit("existingPlayers", playerPositions);

  // Update player position and broadcast to all clients
  socket.on("move", (data) => {
    if (playerPositions[socket.id]) {
      playerPositions[socket.id] = data; // Update player position
      io.emit("playerPositions", playerPositions); // Broadcast all positions
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected: " + socket.id);
    delete playerPositions[socket.id]; // Remove player position on disconnect
    io.emit("playerPositions", playerPositions); // Update all clients
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
