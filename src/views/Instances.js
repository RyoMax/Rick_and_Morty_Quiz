import React, { useState, useEffect } from "react"
import { Motion, spring } from "react-motion"
import Question from "../components/Question"
import Options from "../components/Options"
import GameFinished from "../components/GameFinished"
import Interruption from "../components/Interruption"

//!this Component is responsible for asking "Which of the following characters  is ..." question.
//?Its task is to fetch character Objects from the Rick & Morty API

const Instances = (props) => {
    const [round, setRound] = useState(0)
    const [firstInstance, setFirstInstance] = useState({ state: false })
    const [secondInstance, setSecondInstance] = useState({ state: false })
    const [thirdInstance, setThirdInstance] = useState({ state: false })
    const [gameFinished, setGameFinished] = useState(false)
    const [score, setScore] = useState(0)
    const [message, setMessage] = useState("")
    const [pause, setPause] = useState(false)
    //const [instanceSwitch, switchInstance] = useState(false)

    let question = ""
    let options = ""
    let interruption = ""

    const getCorrectObj = (instance, questionType) => {
        let result = instance[round]
        if (questionType === "first" || questionType === "second") {
            result = result.correct
        } else if (questionType === "third") {
            result = result.episode
        }
        return result
    }

    const checkAnswer = (event) => {
        if(!pause){
            let instance
        let correctObj
        let pick = event.target.closest(".option").id.split("-")
        pick = parseFloat(pick[1])
        switch (true) {
            case firstInstance.state:
                instance = props.state.firstInstanceQuestions
                correctObj = getCorrectObj(instance, "first")
                if (correctObj.id === pick) {
                    console.log("CORREECT!!")
                    setMessage("Correct!")
                    setScore(score + 1)
                } else {
                    console.log("LOOOOOSER!!!")
                    setMessage("Wrong!")
                }
                break;
            case secondInstance.state:
                instance = props.state.secondInstanceQuestions
                correctObj = getCorrectObj(instance, "second")
                if (correctObj.id === pick) {
                    console.log("CORREECT!!")
                    setMessage("Correct!")
                    setScore(score + 1)
                } else {
                    console.log("LOOOOOSER!!!")
                    setMessage("Wrong!")
                }
                break;
            case thirdInstance.state:
                instance = props.state.thirdInstanceQuestions
                correctObj = getCorrectObj(instance, "third")
                correctObj = correctObj.characters.map(char => {
                    let splitedChar = char.split("/")
                    let id = splitedChar[splitedChar.length - 1]
                    return parseFloat(id)
                })
                if (!correctObj.includes(pick)) {
                    console.log("CORREECT!!")
                    setMessage("Correct!")
                    setScore(score + 1)
                } else {
                    console.log("LOOOOOSER!!!")
                    setMessage("Wrong!")
                }
                break;
            default:
                break;
        }
        console.log(pause)
        setPause(true)
        }
    }

    const setUpQuestions = (instance, questionType) => {
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
                    <Options checkAnswer={checkAnswer} questionType={questionType} currentOptions={currentOptions} />
                )
            }
        })
    }

    const finishGame = () => {
        question = <GameFinished score={score} />
    }

    let instance
    switch (true) {
        case firstInstance.state:
            instance = props.state.firstInstanceQuestions
            setUpQuestions(instance, "first")
            break;
        case secondInstance.state:
            instance = props.state.secondInstanceQuestions
            setUpQuestions(instance, "second")
            break;
        case thirdInstance.state:
            instance = props.state.thirdInstanceQuestions
            setUpQuestions(instance, "third")
            break;
        case gameFinished:
            finishGame()
        default:
            break;
    }

    const nextQuestion = () => {
        console.log("we're in, lads!")
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
                    setThirdInstance({ ...thirdInstance, state: false })
                    setGameFinished(true)
                } else {
                    setRound(round + 1)
                }
                break;
            default:

                break;
        }
        setPause(false)
    }


    useEffect(() => {
        if (props.started) {
            setFirstInstance({ state: true, length: props.state.firstInstanceQuestions.length })
            setSecondInstance({ state: false, length: props.state.secondInstanceQuestions.length })
            setThirdInstance({ state: false, length: props.state.thirdInstanceQuestions.length })
            props.setStarted(false)
        }
    }, [props.started])

    /* useEffect(() => {
        if(pause){
            interruption = <Interruption nextQuestion={nextQuestion} message={message} />
        }else {
            interruption = ""
        }
        console.log(interruption)
    }, [pause]) */

    /* if (pause) {
        options = <Interruption nextQuestion={nextQuestion} message={message} />
    } */

    return (
        <>
            <Motion
                defaultStyle={{ y: -500, opacity: 0 }}
                style={{ y: spring(pause ? 0 : -500), opacity: spring(pause ? 1 : 0) }}
            >
                {(style) => (
                    <>
                        {/*                         <Interruption style={{ opacity: style.opacity }} nextQuestion={nextQuestion} message={message} />*/}
                        <section style={{
                            opacity: style.opacity,
                            transform: `translateY(${style.y}px)`
                        }}
                            className="interruption">
                            <h3>{message}</h3>
                            <button onClick={nextQuestion}>Next Question</button>
                        </section>
                    </>
                )}
            </Motion>
            {question}
            {options}
        </>
    )
}

export default Instances