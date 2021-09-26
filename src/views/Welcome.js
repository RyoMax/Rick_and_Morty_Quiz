import React, {useEffect} from "react"

const welcome= React.createRef()


const Welcome = React.forwardRef((props, ref) => {
    
    if(props.started){
        welcome.current.style.display = "none"
    }
    return (
        <section ref={welcome} className="welcome">
            <h2>Get started right here - blablabla</h2>
            <div onClick={props.startGame}>
                <button ref={ref} disabled>Start</button>
            </div>
        </section>
    )
})

export default Welcome