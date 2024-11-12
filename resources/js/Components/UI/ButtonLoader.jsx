import React from 'react'

const ButtonLoader = ({ className = "" }) => {
    return (
        <div className={`${className} w-6 h-6 border-4 border-gray-300 rounded-full border-t-blue-500 animate-spin`}></div>
    )
}

export default ButtonLoader
