import React, { useState, useEffect } from "react";
import SingleQuestion from "./SingleQuestion";

// Utility function to decode HTML entities
function decodeHtmlEntities(text) {
    const textArea = document.createElement('textarea');
    textArea.innerHTML = text;
    return textArea.value;
}

export default function QuestionsPage() {
    const [play, setPlay] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [isChecked, setIsChecked] = useState(false);
    const [fetchKey, setFetchKey] = useState(0);

    useEffect(() => {
        fetch("https://opentdb.com/api.php?amount=30&category=9&difficulty=hard&type=multiple")
            .then(res => res.json())
            .then(data => setQuestions(data.results))
            .catch(err => console.error(err));
    }, [fetchKey]);

    function handlePlayAgain() {
        setPlay(false);
        setSelectedAnswers({});
        setIsChecked(false);
        setFetchKey(prevKey => prevKey + 1);
    }

    function handleAnswerSelect(id, answer) {
        setSelectedAnswers(prev => ({ ...prev, [id]: answer }));
    }

    function handleCheckAnswers() {
        setIsChecked(true);
        setPlay(true);
    }

    const mappedQuestions = questions.map((item, index) => (
        <SingleQuestion
            key={index}
            id={index}
            question={decodeHtmlEntities(item.question)}
            correctAnswer={decodeHtmlEntities(item.correct_answer)}
            incorrectAnswers={item.incorrect_answers.map(decodeHtmlEntities)}
            isChecked={isChecked}
            onAnswerSelect={handleAnswerSelect}
        />
    ));

    const correctAnswersCount = questions.reduce((count, question, index) => {
        if (selectedAnswers[index] === decodeHtmlEntities(question.correct_answer)) {
            return count + 1;
        }
        return count;
    }, 0);

    return (
        <div className="container question_con">
            <div className="wrapper">
                <div className="question_container">
                    {mappedQuestions}
                </div>
                <div className="result_con">
                    {isChecked && <span>You scored {correctAnswersCount}/{questions.length} correct answers</span>}
                    <button onClick={isChecked ? handlePlayAgain : handleCheckAnswers}>
                        {isChecked ? "Play Again" : "Check Answers"}
                    </button>
                </div>
            </div>
        </div>
    );
}
