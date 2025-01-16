const attendanceEndpoint = "http://localhost:8000/dashboard";
// Event listener untuk tombol tutup
async function postAttendance(name, flag) {
    // console.log("info absen : ", infoAbsen);
    console.log("flag : ", flag);

    try {
        await fetch("http://127.0.0.1:8000/storeAbsen", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({
                name: name,
                flag: flag,
            }),
        })
            .then((response) => response.json()) // Ensure to handle the JSON response
            .then((data) => {
                console.log("Success:", data);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    } catch (error) {
        console.log("rorwr", error);
    }
}

function updateAttendanceStatus() {
    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();
    let infoAbsen = "";

    if (currentMinutes >= 5 * 60 && currentMinutes < 15 * 60) {
        infoAbsen = "Absen Masuk";
    } else if (currentMinutes >= 15 * 60 + 30) {
        infoAbsen = "Absen Keluar";
    } else {
        infoAbsen = "Belum Waktu Absensi";
    }

    const statusElement = document.getElementById("keterangan");
    if (statusElement) {
        statusElement.innerText = infoAbsen;
    } else {
        console.error("Element with ID 'keterangan' not found!");
    }
}