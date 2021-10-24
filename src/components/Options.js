import React from "react"

//!this Component is responsible for asking "Which of the following characters  is ..." question.
//?Its task is to fetch character Objects from the Rick & Morty API

const Options = (props) => {
    //const currentImg = props.currentQuestion.correct.image
    console.log(props.currentOptions)
    let options = props.currentOptions.map(option => {
        if (props.questionType === "first") {
            let hint = option.origin.name
            console.log(option)
            if (hint === "unknown") {
                hint = option.location.name
            }
            return (
                <div onClick={props.checkAnswer} id={`option-${option.id}`} className="option">
                    <h4>{option.name}</h4>
                    <p>From: <br/> {hint}</p>
                </div>
            )
        } else if (props.questionType === "second") {
            let currentImg = option.image
            return (
                <div onClick={props.checkAnswer} id={`option-${option.id}`} className="option img-option">
                    <img src={currentImg} width="400" height="400" alt="Now, this would be cheating, wouldn't it?" />
                </div>
            )
        }else if (props.questionType === "third"){
            let currentImg = option.image
            return (
                <div onClick={props.checkAnswer} id={`option-${option.id}`} className="option img-option">
                    <img src={currentImg} width="400" height="400" alt="Now, this would be cheating, wouldn't it?" />
                    <h4>{option.name}</h4>
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