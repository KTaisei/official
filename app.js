// Get access to the camera
navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
        const videoElement = document.getElementById('videoElement');
        videoElement.srcObject = stream;
    })
    .catch(err => {
        console.error('Error accessing the camera:', err);
    });

// Capture the image
document.getElementById('captureButton').addEventListener('click', () => {
    const videoElement = document.getElementById('videoElement');
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = videoElement.videoWidth;
    canvas.height = videoElement.videoHeight;
    context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);

    // Convert canvas to data URL
    const imageDataURL = canvas.toDataURL('image/png');

    // Create a new image element
    const img = new Image();
    img.src = imageDataURL;

    // Append the image to the photo holder
    const photoHolder = document.getElementById('photoHolder');
    photoHolder.innerHTML = '';
    photoHolder.appendChild(img);
});
