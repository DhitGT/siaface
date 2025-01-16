function handleTickInit(tick) {
    // start interval (default is 1 second) and update clock with current time
    Tick.helper.interval(function () {
        var d = Tick.helper.date();
        tick.value = {
            sep: ".",
            hours: d.getHours(),
            minutes: d.getMinutes(),
            seconds: d.getSeconds(),
        };
    });
}

function updateJam() {
    // console.log("f update jam")
    const now = new Date();

    // Format tanggal (contoh: Sabtu, 28 Desember 2024)
    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    };
    const formattedDate = now.toLocaleDateString("id-ID", options);

    // Format waktu (contoh: 14:45:30)
    const formattedTime = now.toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
    });

}