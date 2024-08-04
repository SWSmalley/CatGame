import React from 'react'
import titleimage from "../assets/TITLE.png"

export default function StartScreen({children,className, startGame}) {
  return (
    <div className={`w-full bg-sky-900 aspect-square flex flex-col absolute items-center ${className}`}>
    <img src = {titleimage} className='w-1/2 pixelated m-auto animate-bounce' />
    <button onClick={startGame} className='mb-auto px-5 py-1 bg-white text-4xl font-extrabold border-4 animate-pulse rounded-lg border-red-800'> GO!</button>  
        </div>
    
)
}
