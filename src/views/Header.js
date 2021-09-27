import React from "react"
import headerImg from "../images/Pickle_rick.webp"

const Header = () => {
    return (
        <a href="/">
            <h1>
                <span className="the">The</span>
                Rick and Morty
                <span className="quiz">QUIZ</span>
            </h1>
            <img className="header-img" src={headerImg} />
        </a>
    )
}

export default Header