import React from "react";
import './Logo.css';
import Tilt from 'react-parallax-tilt';
import brain from './brain.png'

const Logo = () => {
    return (
        <div>
            <Tilt className="parallax-effect shadow-5" perspective={500}>
                <div className="inner-element">
                <img alt="logo" src={brain} />
                </div>
            </Tilt>
        </div>
    )
}

export default Logo;