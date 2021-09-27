import React from "react"

const GameFinished = (props) => {
    return (
        <>
            <h2>Done!</h2>
            <p>Your Score : {props.score}</p>
        </>
    )
}

export default GameFinished