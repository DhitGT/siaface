function formatDateIndonesian(date) {
    const dayNames = [
        "Minggu",
        "Senin",
        "Selasa",
        "Rabu",
        "Kamis",
        "Jumat",
        "Sabtu",
    ];
    const monthNames = [
        "Januari",
        "Februari",
        "Maret",
        "April",
        "Mei",
        "Juni",
        "Juli",
        "Agustus",
        "September",
        "Oktober",
        "November",
        "Desember",
    ];

    const day = dayNames[date.getDay()];
    const dayOfMonth = date.getDate();
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();

    return `${day}, ${dayOfMonth} ${month} ${year}`;
}

// Get the current date
const currentDate = new Date();

// Format the date in Indonesian
const formattedDate = formatDateIndonesian(currentDate);

// Set the content in the HTML
document.getElementById("day-name").textContent =
    formattedDate.split(",")[0]; // Only the day name
document.getElementById("formatted-date").textContent = formattedDate
    .split(",")[1]
    .trim();

function getCurrentTime() {
    const now = new Date();
    return now.toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
    });
}