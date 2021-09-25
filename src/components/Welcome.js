import React from "react"

const Welcome = props => {
    return (
        <section className="welcome">
            <h2>Get started right here - blablabla</h2>
            <button onClick={props.function} >Start</button>
        </section>
    )
}

export default Welcome