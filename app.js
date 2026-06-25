const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const db = require("./config/dbConfig");
const app = express();
const server = http.createServer(app);
const io = new Server(server);



app.use(express.static("public"));
app.get("/login", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

// Event Socket
io.on("connection", (socket) => {
  socket.on("chat", async(msg) => {  
    if (msg === ""){
      let pesan = await db.baca();
      io.emit("respon", pesan)
    }
    else{
    db.tulis(msg);
    io.emit("respon", "");
    }
  });
});

server.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});