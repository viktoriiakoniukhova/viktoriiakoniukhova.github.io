import './App.css'
import React from 'react';
import StartPage from './components/StartPage'
import Main from './components/Main'

import blueBlob from './img/blue-blob.png'
import yellowBlob from './img/yellow-blob.png'

const App = () => {

    const [startQuiz, setStartQuiz] = React.useState(false);
    
    function handleStartClick() {
        setStartQuiz(oldState => !oldState )
    }
    
    return (
        <div className="App">
            <div className="App__yellow-blob-container">
                <img src={yellowBlob} alt="yellow-blob" />
            </div>
            <div className="App__blue-blob-container">
                <img src={blueBlob} alt="blue-blob" />
            </div>
            <StartPage 
                onStartClick={handleStartClick} 
                startQuiz={startQuiz}
            />
            <Main 
                startQuiz={startQuiz}
            />
        </div>
    )
}

export default App;