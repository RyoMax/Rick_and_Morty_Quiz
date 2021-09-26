import React from "react"
import headerImg from "../images/header.png"

const Header = () => {
    return (
        <a href="/">
            <h1>
                Rick & Morty
                <span>QUIZ</span>
            </h1>
            <img src={headerImg} />
        </a>
    )
}

export default Header