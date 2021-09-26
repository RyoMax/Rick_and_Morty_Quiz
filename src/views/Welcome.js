import React from "react"

const Welcome = React.forwardRef((props, ref) => {
    return (
        <section className="welcome">
            <h2>Get started right here - blablabla</h2>
            <button onClick={props.function} ref={ref} disabled>Start</button>
        </section>
    )
})

export default Welcome