import React from 'react'
import './style.css'

export default class RecordVoiceButton extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            stateRecorder: null,
            audioChunks: []
        }

        this.clearAudio = this.clearAudio.bind(this);
        this.toggleRecording = this.toggleRecording.bind(this);
    }

    toggleRecording = () => {
        this.setState({isRecordingEnabled: !this.state.isRecordingEnabled});
        
        if (!this.state.isRecordingEnabled) {
            this.startRecording();
        } else {
            this.state.mediaRecorder.stop();

            this.playRecordedAudio();
            
            this.clearAudio();
        };
    }
    
    startRecording = () => {
        navigator.mediaDevices.getUserMedia({audio: true})
        .then(stream => {
            
            this.setState({mediaRecorder : new MediaRecorder(stream)})
            
            this.state.mediaRecorder.start();
            
            this.state.mediaRecorder.addEventListener("dataavailable", e => {
                this.setState({audioChunks: this.state.audioChunks.concat(e.data)})
            });
        });
    }

    playRecordedAudio = () => {
        const audioBlob = new Blob(this.state.audioChunks);
        const audioUrl = URL.createObjectURL(audioBlob);
        const audio = new Audio(audioUrl);
            
        audio.play(); 
    }
    
    clearAudio = () => {
        this.setState({audioChunks: []})
    }

    render(){
        return (
            <button 
                onClick={this.toggleRecording}
                className="recordButton" >
            {this.state.isRecordingEnabled ? "Stop recording" : "Start recording"}</button>)
    }
}
