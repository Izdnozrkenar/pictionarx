import React from 'react'
import './style.css'

export default class RecordVoiceButton extends React.Component {
    state = {
        isRecordingEnabled: false,
        audioChunks: []
    }


    toggleRecording = () => {
        this.setState({ isRecordingEnabled: !this.state.isRecordingEnabled }, () => {
            if (this.state.isRecordingEnabled) {
                this.startRecording();
            } else {
                console.log(this.state.audioChunks)

                this.state.mediaRecorder.addEventListener("stop",() => {
                    this.playRecordedAudio();
                    this.clearAudio();
                })

                this.state.mediaRecorder.stop();
            };
        });
    }

    startRecording = () => {
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then(stream => {

                this.setState({ mediaRecorder: new MediaRecorder(stream) })

                this.state.mediaRecorder.start();

                this.state.mediaRecorder.ondataavailable = (e) => {
                    console.log(e.data)
                    this.setState({ audioChunks: this.state.audioChunks.concat(e.data) })
                };
            });
    }

    playRecordedAudio = () => {
        const audioBlob = new Blob(this.state.audioChunks);
        const audioUrl = URL.createObjectURL(audioBlob);
        const audio = new Audio(audioUrl);

        audio.play();
    }

    clearAudio = () => {
        this.setState({ audioChunks: [] })
    }

    render() {
        return (
            <button
                onClick={this.toggleRecording}
                className="recordButton" >
                {this.state.isRecordingEnabled ? "Stop recording" : "Start recording"}</button>)
    }
}
