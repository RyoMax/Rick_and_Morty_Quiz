import React from "react"

//!this Component is responsible for asking "Which of the following characters  is ..." question.
//?Its task is to fetch character Objects from the Rick & Morty API

const Question = (props) => {
    //const currentImg = props.currentQuestion.correct.image
    let question
    let questionObj = props.currentCorrect
    if (props.questionType === "first") {
        let currentImg = questionObj.image
        question = (
            <>
                <h3>Who is this?</h3>
                <img src={currentImg} width="400" height="400" />
            </>
        )
    } else if (props.questionType === "second") {
        let currentName = questionObj.name
        let hint = questionObj.origin.name
        if (hint === "unknown") {
            hint = questionObj.location.name
        }
        question = (
            <>
                <h3>Who is this?</h3>
                <h4> {currentName} </h4>
                <p>From {hint} </p>
            </>
        )
    } else if (props.questionType === "third") {
        let currentEpisode = questionObj.name
        let hint = questionObj.descr
        question = (
            <>
                <h3>Which Character does NOT appear in this episode?</h3>
                <h4> {currentEpisode} </h4>
                <p>{hint} </p>
            </>
        )
    }
    return (
        <section className="questions">
            {question}
        </section>
    )
}

export default Question