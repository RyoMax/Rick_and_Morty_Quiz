import React from "react"

const welcome= React.createRef()


const Welcome = React.forwardRef((props, ref) => {
    
    if(props.started){
        welcome.current.style.display = "none"
        console.log(welcome.current)
    }
    return (
        <section ref={welcome} className="welcome">
            <h2>TEST YOUR RICK AND MORTY KNOWLEDGE</h2>
            <div onClick={props.startGame}>
                <button ref={ref} disabled>GET SCHWIFTY</button>
            </div>
        </section>
    )
})

export default Welcome