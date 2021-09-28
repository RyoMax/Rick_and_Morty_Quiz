import React, { useEffect, useState } from "react"

const display = React.createRef()

const GameFinished = (props) => {
    const [lifeScore, setLifeScore] = useState(0)

    let verdict = ""

    const randomize = (comments) => {
        let max = comments.length - 1
        let index = Math.floor(Math.random() * (max - 0 + 1) + 0)
        return comments[index]
    }

    const generateComment = (score) => {
        let comments = []
        if (score < 4) {
            comments = [
                "Admit it, you actually never watched the show",
                "Well...",
                "Things can only get better from here I guess...",
                "Were you even trying?"]
            return randomize(comments)
        } else if (score < 7) {
            comments = [
                "I guess you know at least something",
                "Not the best",
                "impressive... in an inadequate way",
                "You can do better?",
                "okay...",
                "That was... almost good!",
                "You don't expect something nice at this point, do you?"]
            return randomize(comments)
        } else if (score < 12) {
            comments = [
                "Well done!",
                "That's the spirit!",
                "impressive...",
                "Not the worst!",
                "sufficient for my taste"]
            return randomize(comments)
        } else {
            comments = [
                "Amazing!",
                "Wow! a Rick and Morty Nerd",
                "There are other shows out there, you know...",
                "A perfect run!"]
            return randomize(comments)
        }
    }

    const increaseScore = () => {
        if (lifeScore === props.score) {
            display.current.style.textDecoration = "underline";
        } else {
            if (lifeScore < 4) {
                display.current.children[0].style.color = "red";
            } else if (lifeScore < 7) {
                display.current.children[0].style.color = "yellow";
            }else if(lifeScore < 12){
                display.current.children[0].style.color = "#80fd64";
            }else{
                display.current.children[0].style.color = "#00b0c8";
            }
            setTimeout(() => {
                setLifeScore(lifeScore + 1)
            }, 200);
        }
    }

    useEffect(() => {
        increaseScore()
    }, [])
    useEffect(() => {
        increaseScore()
    })

    if (lifeScore === props.score) {
        verdict = generateComment(lifeScore)
    }

    return (
        <section className="game-finished">
            <h2>THAT'S IT</h2>
            <p ref={display} >Your Score : <span className="score">{lifeScore}</span></p>
            <span className="verdict">{verdict}</span>
        </section>
    )
}

export default GameFinished