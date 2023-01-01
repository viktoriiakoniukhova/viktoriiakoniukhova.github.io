import React from 'react';
import Question from './Question'

const Main = (props) => {
    const NUMBER_OF_QUESTIONS = 5;

    const [questionsData, setQuestionsData] = React.useState([]);
    const [answers, setAnswers] = React.useState(Array.apply(null, Array(5)).map(() => 0))
    const [points, setPoints] = React.useState(0);

    const [gameIsOver, setGameIsOver] = React.useState(false);
    const [replay, setReplay] = React.useState(false);

    const [loader, setLoader] = React.useState(false);

    React.useEffect(() => {
        setPoints(0)
        if(props.startQuiz){
            setLoader(oldState => !oldState)

            fetch(`https://opentdb.com/api.php?amount=${NUMBER_OF_QUESTIONS}`)
                .then((response) => response.json())
                .then((data) => {
                    setQuestionsData(() => {
                        const rawData = data.results
                        return rawData.map(obj => {
                            const question = decode(obj.question)
                            const correctAnswer = decode(obj.correct_answer)
                            const incorrectAnswers = obj.incorrect_answers.map(ans => decode(ans))
                            return {
                                ...obj,
                                question: question,
                                correct_answer: correctAnswer,
                                incorrect_answers: incorrectAnswers
                            }
                        })
                    })
                    setLoader(oldState => !oldState)
                });
        }

    }, [props.startQuiz, replay])

    React.useEffect(() => {
        setPoints(answers.reduce((prev, curr) => prev + curr), 0)
    }, [answers])

    const questions = questionsData.map((questionData, index) => 
        <Question 
            key={index}
            questionIndex = {index}
            question={questionData.question}
            correctAnswer={questionData.correct_answer}
            incorrectAnswers={questionData.incorrect_answers}
            setAnswers={setAnswers}

            gameIsOver = {gameIsOver}
            replay={replay}
        />)

    function handleCheck() {
        const gameIsOverNext = !gameIsOver;
        setGameIsOver(gameIsOverNext)

        if(gameIsOver) {
            setAnswers(Array.apply(null, Array(5)).map(() => 0))
            setReplay(oldState => !oldState)
        }
    }
    
    function decode(str) {
        let txt = new DOMParser().parseFromString(str, "text/html");
        return txt.documentElement.textContent;
    }
    
    return (
        <div className={`Main screen ${props.startQuiz ? '' : 'hide'}`}>
            <div className='Main__questions'>{questions}</div>
            <div className="Main__results">
                <p className={gameIsOver ? "show" : "hide"}>You scrored {points}/5 correct answers</p>
                <button className={!loader ? "show" : "hide"} onClick={handleCheck}>{gameIsOver ? "Play Again" : "Check results"}</button>
            </div>
        </div>
    )
}

export default Main;