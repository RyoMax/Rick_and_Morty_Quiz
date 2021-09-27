import React, { useEffect, useState } from "react"

const GameFinished = (props) => {
    const [lifeScore, setLifeScore] = useState(0)

    const increaseScore = () => {
        if (lifeScore === props.score) {
            return
        } else {
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
    return (
        <section className="game-finished">
            <h2>Done!</h2>
            <p>Your Score : {lifeScore}</p>
        </section>
    )
}

export default GameFinished