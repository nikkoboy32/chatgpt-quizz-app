import React, { useState } from "react";

export default function SingleQuestion({ question, correctAnswer, incorrectAnswers, isChecked, onAnswerSelect, id }) {
    const [selectedAnswer, setSelectedAnswer] = useState(null);

    const allAnswers = [...incorrectAnswers, correctAnswer].sort();

    function handleSelect(answer) {
        setSelectedAnswer(answer);
        onAnswerSelect(id, answer);
    }

    return (
        <div className="question_content">
            <h2>{question}</h2>
            <div className="button_container">
                {allAnswers.map(answer => {
                    let className = "";
                    if (isChecked) {
                        if (answer === correctAnswer) {
                            className = "correct";
                        } else if (answer === selectedAnswer) {
                            className = "incorrect";
                        }
                    }

                    return (
                        <button
                            key={answer}
                            onClick={() => handleSelect(answer)}
                            className={selectedAnswer === answer ? `selected ${className}` : className}
                            disabled={isChecked}
                        >
                            {answer}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
