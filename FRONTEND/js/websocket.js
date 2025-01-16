let socket;
let isConnected = false;

// Fungsi untuk menghubungkan ke WebSocket
function connectWebSocket() {
    socket = new WebSocket("ws://192.168.100.238:800");

    socket.onopen = function () {
        isConnected = true;
        document.getElementById("status").innerText = "Terhubung ke WebSocket!";
        document.getElementById("status").style.color = "green";
    };

    socket.onmessage = function (event) {
        document.getElementById("data").innerText = "Jarak: " + event.data + " cm";
    };

    socket.onerror = function (error) {
        document.getElementById("error").innerText = "Kesalahan koneksi: " + error;
    };

    socket.onclose = function () {
        isConnected = false;
        document.getElementById("status").innerText = "Koneksi terputus";
        document.getElementById("status").style.color = "red";
    };
}

window.onload = function () {
    connectWebSocket();
}