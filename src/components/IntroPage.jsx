import React from "react"

export default function IntroPage(props) { 
    return (
        <div className="container intro_con">
            <div className="contents">
                <h2>Quizzical</h2>
                <p>Some description if needed</p>
                <button onClick={props.handleClick}>Start Quiz</button>
            </div>
        </div>
    )
}