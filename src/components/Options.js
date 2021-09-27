import React from "react"

//!this Component is responsible for asking "Which of the following characters  is ..." question.
//?Its task is to fetch character Objects from the Rick & Morty API

const Options = (props) => {
    //const currentImg = props.currentQuestion.correct.image
    let options = props.currentOptions.map(option => {
        if (props.questionType === "first") {
            let hint = option.origin.name
            if (hint === "unknown") {
                hint = option.location.name
            }
            return (
                <div onClick={props.checkAnswer} id={`option-${option.id}`} className="option-field">
                    <h4>{option.name}</h4>
                    <p>{hint}</p>
                </div>
            )
        } else if (props.questionType === "second" || props.questionType === "third") {
            let currentImg = option.image
            return (
                <div onClick={props.checkAnswer} id={`option-${option.id}`} className="option-field">
                    <img src={currentImg} alt="Now, this would be cheating, wouldn't it?" />
                </div>
            )
        }

    })
    return (
        <section className="options">
            {options}
        </section>
    )
}

export default Options