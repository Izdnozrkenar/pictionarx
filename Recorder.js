const toggleRecordingButton = document.getElementById('main-button');

let isRecordingEnabled = false;

const clearAudio = audioChunks => {
    while(audioChunks.length > 0) {
        audioChunks.pop();
    };
};

const toggleRecording = mediaRecorder => {
    isRecordingEnabled = !isRecordingEnabled;

    if (isRecordingEnabled) {
        toggleRecordingButton.textContent = "Stop recording";
        mediaRecorder.start();
    } else {
        toggleRecordingButton.textContent = "Start recording";
        mediaRecorder.stop();
    };
};

navigator.mediaDevices.getUserMedia({audio : true})
    .then(stream => {
        const mediaRecorder = new MediaRecorder(stream);

        const audioChunks = [];

        mediaRecorder.addEventListener("dataavailable", e => {
            audioChunks.push(e.data);
        });

        mediaRecorder.addEventListener("stop", () => {
            const audioBlob = new Blob(audioChunks);
            const audioUrl = URL.createObjectURL(audioBlob);
            const audio = new Audio(audioUrl);

            audio.play(); 

            clearAudio(audioChunks);
        });

        toggleRecordingButton.addEventListener('click', () => toggleRecording(mediaRecorder));
    })
    .catch (err => {
        console.log(err);
        alert("Recording is not possible without recording permissions.");
    });
