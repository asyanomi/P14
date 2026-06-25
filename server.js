
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve file static



// Event saat client connect
io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    // Terima pesan dari client
    socket.on("chat message", (msg) => {
        console.log("Message:", msg);

        // Kirim pesan ke semua client (broadcast)
        io.emit("chat message", msg);
    });

    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
    });
});

// Start server
server.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
