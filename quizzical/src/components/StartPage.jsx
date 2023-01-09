import React from "react";

const StartPage = (props)  => {
    return (
        <div className={`StartPage screen ${props.startQuiz ? 'hide' : ''}`}>
            <h1 className="StartPage__heading">Quizzical</h1>
            <p className="StartPage__description">Press "Start Quiz" to challenge yourself in general questions</p>
            <div className="StartPage__button">
                <button onClick={props.onStartClick}>Start Quiz</button>
            </div>
        </div>
    )
}

export default StartPage;