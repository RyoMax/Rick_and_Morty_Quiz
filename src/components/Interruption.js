import React from "react"

const Interruption = props => {

    return (
        <section className="intersection">
            <h3>{props.message }</h3>
            <button onClick={props.nextQuestion}>Next Question</button>
        </section>
    )
}

export default Interruption