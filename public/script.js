const socket = io();
const input = document.getElementById("messageInput");
const messages = document.getElementById("messages");
const nama = document.getElementById("nama");

// Terima pesan dari server
socket.on("respon", (msg) => {
    messages.innerHTML = msg;
});


// Kirim pesan ke server
function sendMessage() {
    if (input.value) {
        socket.emit("chat", input.value);
        input.value = "";
    }
    else{
        socket.emit("chat", "");
    }
}
sendMessage();