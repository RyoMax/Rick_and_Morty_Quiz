import React from "react"

const welcome= React.createRef()


const Welcome = React.forwardRef((props, ref) => {
    
    if(props.started){
        welcome.current.style.display = "none"
        console.log(welcome.current)
    }
    return (
        <section ref={welcome} className="welcome">
            <h2>Test your Rick and Morty knowledge</h2>
            <div onClick={props.startGame}>
                <button ref={ref} disabled>Get Schwifty</button>
            </div>
        </section>
    )
})

export default Welcome