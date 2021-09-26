import React, { useEffect, useState } from "react"
import Welcome from "./Welcome"
import Instance1 from "./Instance-1"

const startButton = React.createRef()



const TheGame = props => {

    const [gameStarted, setGameStarted] = useState(false)

    const startGame = () => {
        setGameStarted(true)
        console.log("I was clickedy clicked!")
    }

    useEffect(() => {
        if (props.state.pageReady) {
            startButton.current.disabled = false

        }
    }, [props.state.pageReady])

    return (
        <>
            <Welcome started={gameStarted} startGame={startGame} ref={startButton} />
            <Instance1 state={props.state} started={gameStarted} setStarted={setGameStarted} />
        </>
    )
}

export default TheGame