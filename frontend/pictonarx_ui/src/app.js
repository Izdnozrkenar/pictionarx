import React from 'react';
import RecordVoiceButton from './voice_recorder/record-voice-button'

function App() {
  return (
    <div className="container">
      <h1>Pictionarx</h1>
      <RecordVoiceButton someProp={true}/>
    </div>
  );
}

export default App;
