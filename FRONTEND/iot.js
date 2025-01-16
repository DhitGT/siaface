async function fetchData() {
    try {
        const response = await fetch("http://<IP_ESP32>/data"); // Ganti <IP_ESP32> dengan IP dari ESP32 Anda
        const data = await response.json();
        document.getElementById("espData").innerText = `Value: ${data.value}`;
    } catch (error) {
        document.getElementById("espData").innerText = "Gagal mengambil data!";
        console.error("Error:", error);
    }
}

// Ambil data setiap 5 detik
fetchData();
setInterval(fetchData, 5000);