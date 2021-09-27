import React, { useEffect, useState } from "react"
import Welcome from "./Welcome"
import Instances from "./Instances"

const startButton = React.createRef()



const TheGame = props => {

    const [gameStarted, setGameStarted] = useState(false)

    const startGame = () => {
        setGameStarted(true)
    }

    useEffect(() => {
        if (props.state.pageReady) {
            startButton.current.disabled = false

        }
    }, [props.state.pageReady])

    return (
        <>
            <Welcome started={gameStarted} startGame={startGame} ref={startButton} />
            <Instances state={props.state} started={gameStarted} setStarted={setGameStarted} />
        </>
    )
}

export default TheGame