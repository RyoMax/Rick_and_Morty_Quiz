import React, { useState, useEffect } from "react"
import Question from "./Question"
import Options from "./Options"

//!this Component is responsible for asking "Which of the following characters  is ..." question.
//?Its task is to fetch character Objects from the Rick & Morty API

const Instance1 = (props) => {
    const [round, setRound] = useState(0)
    const [firstInstance, setFirstInstance] = useState({ state: false })
    const [secondInstance, setSecondInstance] = useState({ state: false })
    const [thirdInstance, setThirdInstance] = useState({ state: false })
    //const [instanceSwitch, switchInstance] = useState(false)

    let question = ""
    let options = ""

    const setUpCharacterQuestions = (instance, questionType) => {
        let questionObj = instance
        question = questionObj.map((e, i) => {
            let currentCorrect
            if (questionType === "first" || questionType === "second") {
                currentCorrect = e.correct
            } else if (questionType === "third") {
                currentCorrect = e.episode
            }
            if (i === round) {
                return (
                    <Question questionType={questionType} currentCorrect={currentCorrect} />
                )
            }
        })
        options = questionObj.map((e, i) => {
            let currentOptions = e.options
            if (i === round) {
                return (
                    <Options questionType={questionType} currentOptions={currentOptions} />
                )
            }
        })
    }

    let instance
    switch (true) {
        case firstInstance.state:
            console.log("First State")
            instance = props.state.firstInstanceQuestions
            setUpCharacterQuestions(instance, "first")
            break;
        case secondInstance.state:
            console.log("Second State")
            instance = props.state.secondInstanceQuestions
            setUpCharacterQuestions(instance, "second")
            break;
        case thirdInstance.state:
            console.log("Third State")
            instance = props.state.thirdInstanceQuestions
            setUpCharacterQuestions(instance, "third")
            break;
        default:
            break;
    }

    const nextQuestion = () => {
        switch (true) {
            case firstInstance.state:
                if (firstInstance.length - 1 === round) {
                    setSecondInstance({ ...secondInstance, state: true })
                    setFirstInstance({ ...firstInstance, state: false })
                    setRound(0)
                } else {
                    setRound(round + 1)
                }
                break;
            case secondInstance.state:
                if (secondInstance.length - 1 === round) {
                    setSecondInstance({ ...secondInstance, state: false })
                    setThirdInstance({ ...thirdInstance, state: true })
                    setRound(0)
                } else {
                    setRound(round + 1)
                }
                break;
            case thirdInstance.state:
                if (secondInstance.length - 1 === round) {
                    setSecondInstance({ ...secondInstance, state: false })
                    setThirdInstance({ ...thirdInstance, state: true })
                    setRound(0)
                } else {
                    setRound(round + 1)
                }
                break;
            default:

                break;
        }

    }

    useEffect(() => {
        if (props.started) {
            setFirstInstance({ state: true, length: props.state.firstInstanceQuestions.length })
            setSecondInstance({ state: false, length: props.state.secondInstanceQuestions.length })
            setThirdInstance({ state: false, length: props.state.thirdInstanceQuestions.length })
            props.setStarted(false)
        }
    }, [props.started])




    return (
        <>
            { question}
            {options}
            <button onClick={nextQuestion}>Next Question</button>
            {/* {content} */}
        </>
    )
}

export default Instance1