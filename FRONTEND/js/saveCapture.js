const saveFrameWithCamera = async () => {
    const canvas = document.querySelector('canvas'); // The canvas where the face-api.js results are drawn
    const video = document.getElementById('video'); // The video element for the webcam feed
    
    // Create an offscreen canvas to draw both the video frame and the canvas content
    const offscreenCanvas = document.createElement('canvas');
    const offscreenContext = offscreenCanvas.getContext('2d');
    
    // Set the offscreen canvas size to match the video dimensions
    offscreenCanvas.width = video.videoWidth;
    offscreenCanvas.height = video.videoHeight;

    // Draw the video frame onto the offscreen canvas
    offscreenContext.drawImage(video, 0, 0, offscreenCanvas.width, offscreenCanvas.height);
    
    // Now draw the canvas content (face-api.js results) on top of the video frame
    offscreenContext.drawImage(canvas, 0, 0, offscreenCanvas.width, offscreenCanvas.height);
    
    // Convert the offscreen canvas to a base64-encoded image (JPEG format)
    const dataURL = offscreenCanvas.toDataURL('image/jpeg');
    
    // Optional: Send this base64 image to the server or save it locally
    return dataURL;
};

// Function to send the captured image to the server
const postCapturedImage = (dataURL) => {
    // Send the captured image (base64 string) to your server
    fetch('http://your-server-endpoint.com/save_image', {
        method: 'POST',
        body: JSON.stringify({
            image: dataURL, // The base64 encoded image
            timestamp: new Date().toISOString(), // Optional timestamp
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => response.json())
    .then(data => {
        console.log('Image saved successfully:', data);
    })
    .catch((error) => {
        console.error('Error saving image:', error);
    });
};
