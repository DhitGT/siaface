function showPopup(message = '', m2 = '', m3 = '',m4='') {
    const popup = document.getElementById("popup");
    const overlay = document.getElementById("popup-overlay");
    const popupMessage1 = document.getElementById("message-1");
    const popupMessage2 = document.getElementById("message-2");
    const popupMessage3 = document.getElementById("message-3");
    const popupMessage4 = document.getElementById("message-4");

    popupMessage1.innerText = message;
    popupMessage2.innerText = m2;
    popupMessage3.innerText = m3;
    popupMessage4.innerText = " Suhu Tubuh "+m4 +"°C" ;
    popup.classList.add("show");
    overlay.classList.add("show");

    // Menutup popup secara otomatis setelah 5 detik
    setTimeout(() => {
        closePopup();
    }, 5000);
}

function closePopup() {
    const popup = document.getElementById("popup");
    const overlay = document.getElementById("popup-overlay");

    popup.classList.remove("show");
    overlay.classList.remove("show");
}