
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.listen(PORT, () => {
  console.log("Running on port " + PORT);
});
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
