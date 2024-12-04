import React from 'react'
import './Hero.css'
import hand_icon from '../assets/hand_icon.png'
import arrow from '../assets/arrow.png'
import hero_image from '../assets/hero_image.png'

const Hero = () => {
    return (
        <div className="hero">
            <div className="hero-left">
                <h1>NEW ARRIVAL ONLY</h1>
                <div>
                    <div className="hero-hand-icon">
                        <p>new</p>
                        <img src={hand_icon} alt="" />
                    </div>
                    <p>Collection</p>
                    <p>For Everyone</p>
                    <div className="hero-latest-btn">
                        <p>Latest Collection</p>
                        <img src={arrow} alt="" />
                    </div>
                </div>
            </div>
            <div className="hero-right">
                <img src={hero_image} alt="" />
            </div>
        </div>
    )
}

export default Hero