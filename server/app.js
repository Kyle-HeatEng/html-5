const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*", // Adjust according to your security requirements
    methods: ["GET", "POST"],
  },
});

// Store player positions
let playerPositions = {};

console.log('working on main')

io.on("connection", (socket) => {
  console.log("A user connected: " + socket.id);

  // Listen for "message" events from clients
  socket.on("message", (message) => {
    // Broadcast the received message to all clients
    io.emit("message", message);
  });

  // Listen for position updates from clients
  socket.on("updatePosition", (position) => {
    // Update the position for the current player
    playerPositions[socket.id] = position;
    // Broadcast the updated positions to all clients
    io.emit("playerPositions", playerPositions);
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

//https://websocket.ai-ticulate.uk