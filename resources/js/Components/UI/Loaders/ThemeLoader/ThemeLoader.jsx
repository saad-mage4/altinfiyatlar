import React from 'react'
import "./themeloader.scss"

const ThemeLoader = () => {
    return (
        <div className="loading-overlay">
            <div className="loading-dots">
                <div className="dot-1"></div>
                <div className="dot-2"></div>
                <div className="dot-3"></div>
                <div className="dot-4"></div>
                <div className="dot-5"></div>
                <div className="dot-6"></div>
                <div className="dot-7"></div>
            </div>
        </div>
    )
}

export default ThemeLoader
