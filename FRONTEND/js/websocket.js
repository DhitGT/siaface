let socket;
let isConnected = false;
let data  = '';

// Fungsi untuk menghubungkan ke WebSocket
function connectWebSocket() {
    socket = new WebSocket("ws://192.168.100.238:800");

    socket.onopen = function () {
        isConnected = true;
        // document.getElementById("status").innerText = "Terhubung ke WebSocket!";
        // document.getElementById("status").style.color = "green";
    };

    socket.onmessage = function (event) {
        data = event.data
        // document.getElementById("data").innerText = "Jarak: " + event.data + " cm";
    };

    socket.onerror = function (error) {
        // document.getElementById("error").innerText = "Kesalahan koneksi: " + error;
    };

    socket.onclose = function () {
        isConnected = false;
        // document.getElementById("status").innerText = "Koneksi terputus";
        // document.getElementById("status").style.color = "red";
    };
}

function getSocketData(){
    return data
}

window.onload = function () {
    connectWebSocket();
}