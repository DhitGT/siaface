const video = document.getElementById("video");

// Load models
Promise.all([
    faceapi.nets.ssdMobilenetv1.loadFromUri("/models"),
    faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
    faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
]).then(startWebcam);

function startWebcam() {
    navigator.mediaDevices
        .getUserMedia({
            video: true,
            audio: false,
        })
        .then((stream) => {
            video.srcObject = stream;
        })
        .catch((error) => {
            console.error(error);
        });
}



const speakText = (text2) => {
    const text = text2

    // Check if the browser supports SpeechSynthesis
    if ('speechSynthesis' in window) {
        const msg = new SpeechSynthesisUtterance();
        msg.text = text;
        msg.lang = 'id-ID'; // Indonesian language code

        // Speak the text
        window.speechSynthesis.speak(msg);
    } else {
        alert("Text-to-Speech is not supported in this browser.");
    }
};

async function getLabeledFaceDescriptions() {
    const labels = await getClassNames(); // Get class names from the API
    return Promise.all(
        labels.map(async (label) => {
            const descriptions = [];
            for (let i = 1; i <= label.image_count; i++) {  // Assuming 2 images per class
                try {
                    const img = await faceapi.fetchImage(`http://127.0.0.1:8000/images/${label.class_name}/${i}.jpg`);
                    const detections = await faceapi
                        .detectSingleFace(img)
                        .withFaceLandmarks()
                        .withFaceDescriptor();

                    // Ensure detections are valid before accessing the descriptor
                    if (detections) {
                        descriptions.push(detections.descriptor);
                    } else {
                        console.warn(`No face detected in image for label: ${label.class_name}`);
                    }
                } catch (error) {
                    console.error(`Failed to fetch or process image for label: ${label.class_name}, image ${i}`, error);
                }
            }
            return new faceapi.LabeledFaceDescriptors(label.class_name, descriptions);
        })
    );
}


video.addEventListener("play", async () => {
    const labeledFaceDescriptors = await getLabeledFaceDescriptions();
    const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors);

    const canvas = faceapi.createCanvasFromMedia(video);
    document.getElementById('container-vidio').appendChild(canvas);

    console.log("canvas")


    const displaySize = { width: video.width, height: video.height };
    faceapi.matchDimensions(canvas, displaySize);

    let lastLabel = null;
    let lastLabelTime = null;
    let detectionInterval = null;
    let attendancePosted = false; // Flag to ensure postAttendance is executed only once

    const MORNING_START = 5 * 60; // 5:00 AM in minutes
    const MORNING_END = 12 * 60; // 12:00 PM in minutes
    const LATE_THRESHOLD = 6 * 60 + 45; // 6:45 AM in minutes
    const EVENING_START = 15 * 60 + 30; // 3:30 PM in minutes

    function getCurrentMinutes() {
        const now = new Date();
        return now.getHours() * 60 + now.getMinutes();
    }



    async function startDetection() {
        attendancePosted = false;
        let listUdahAbsen = await getAbsen();
        let listUdahAbsenExit = await getAbsenExit();
        detectionInterval = setInterval(async () => {
            const detections = await faceapi
                .detectAllFaces(video)
                .withFaceLandmarks()
                .withFaceDescriptors();

            if (detections && detections.length > 0) {
                const resizedDetections = faceapi.resizeResults(detections, displaySize);

                canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);

                const results = resizedDetections.map((d) => {
                    return faceMatcher.findBestMatch(d.descriptor);
                });

                console.log("RESULT : ", results);
                let suhu = await getSocketData()
                let i = 0;
                let result = results[i]
                
                    const box = resizedDetections[i].detection.box;
                    const label2 = result.toString() + "\nSuhu: " + suhu + "°C"; // Combine labels with newline for a multi-line label

                    // Adjust position of the label if needed to ensure "Suhu" appears below "result"
                    const labelPosition = { x: box.x, y: box.y - 10 }; // Slightly offset the label vertically

                    const drawBox = new faceapi.draw.DrawBox(box, {
                        label: label2,
                        boxColor: 'rgba(0, 89, 255, 0.8)', // Optional: Customize the box color
                        drawLabel: true, // Ensure the label is drawn
                    });

                    drawBox.draw(canvas);


                    const label = result.label;

                    // Check if the label is not "unknown"
                    if (label !== "unknown" ) {
                        const now = Date.now();

                        // Check if the label matches the last label and has remained the same for 1 second
                        const now2 = new Date();
                        const currentHour = now2.getHours();
                        const currentMinutes = getCurrentMinutes();
                        let keterangan = "Tepat Waktu"
                        console.log("JAM 2 : ", currentHour)
                        if (currentMinutes >= MORNING_START && currentMinutes < MORNING_END && suhu != "") {
                            if (label === lastLabel && !listUdahAbsen.some((absen) => absen.name === label)) {
                                console.log("Masuk absensi");
                                if (lastLabelTime && now - lastLabelTime >= 2000 && !attendancePosted) {
                                    console.log("Masuk absensi confirmed");
                                    console.log(`Stopping detection, label \"${label}\" remained the same for 1 second.`);
                                    clearInterval(detectionInterval); // Stop the detection

                                    const currentTime = getCurrentTime();
                                    const currentMinutes = getCurrentMinutes();

                                    if (currentMinutes > LATE_THRESHOLD) {
                                        showPopup('Anda terlambat', label, `Anda terlambat absen di jam ${currentTime}`,suhu);
                                        speakText(`Selamat datang, ${label}, Anda terlambat absen di jam ${currentTime}`);
                                        keterangan = "Terlambat"
                                    } else {
                                        showPopup('Selamat datang', label, `Anda absen di jam ${currentTime}`,suhu);
                                        speakText(`Selamat datang, ${label}, Anda absen di jam ${currentTime}`);
                                        keterangan = "Hadir"
                                    }

                                    postAttendance(label, 'masuk',keterangan,suhu  ); // Call only once
                                    attendancePosted = true; // Set the flag

                                    await new Promise((resolve) => setTimeout(resolve, 4000));
                                    // Reset and restart detection
                                    lastLabel = null;
                                    lastLabelTime = null;
                                    startDetection(); // Restart the loop
                                }
                            } else {
                                lastLabel = label; // Update the label
                                lastLabelTime = now; // Update the time
                            }
                        } else if (currentMinutes >= EVENING_START && suhu != "") {
                            if (label === lastLabel && !listUdahAbsenExit.some((absen) => absen.name === label) && listUdahAbsen.some((absen) => absen.name === label)) {
                                console.log("Keluar absensi");
                                if (lastLabelTime && now - lastLabelTime >= 2000 && !attendancePosted) {
                                    console.log("Keluar absensi confirmed");
                                    console.log(`Stopping detection, label \"${label}\" remained the same for 1 second.`);
                                    clearInterval(detectionInterval); // Stop the detection

                                    const currentTime = getCurrentTime();
                                    showPopup('Hati Hati', label, `Anda absen keluar di jam ${currentTime}`,suhu);
                                    speakText(`Hati Hati, ${label}, Anda absen keluar di jam ${currentTime}`);

                                    postAttendance(label, 'keluar',suhu ); // Call only once
                                    attendancePosted = true; // Set the flag

                                    await new Promise((resolve) => setTimeout(resolve, 4000));
                                    // Reset and restart detection
                                    lastLabel = null;
                                    lastLabelTime = null;
                                    startDetection(); // Restart the loop
                                }
                            } else {
                                lastLabel = label; // Update the label
                                lastLabelTime = now; // Update the time
                            }
                        } else {
                            console.log("Absensi tidak diizinkan pada waktu ini");
                        }




                    } else {
                        // Reset the tracking if the label is "unknown"
                        lastLabel = null;
                        canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
                        lastLabelTime = null;
                        attendancePosted = false; // Reset the flag
                    }
                
            }else{
                canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
            }
        }, 100);
    }
    startDetection()

});
