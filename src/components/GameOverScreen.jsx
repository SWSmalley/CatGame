import React from 'react'
import badEnd from "../assets/badEnd.png"
import fish from '../assets/fish.png'

export default function GameOverScreen({variant}) {
  /// make actual variants here at some point.
  const variants = {
    "lose" : { 
      "text" : "The cat-pitalists win :(",
      "image" : badEnd
    },

    "win" : {
      "text" : "Today you redistibuted the wealth, tomorrow the means of purrduction",
      "image" : fish
    },

  }

  return (
    <div className=' flex flex-col opacity-0 transition-opacity duration-1000 hover:opacity-100 w-full aspect-square bg-black absolute z-20 items-center justify-center text-white'><img src = {variants[variant].image} className='w-3/4 pixelated m-auto '/><a className='m-auto text-2xl font-bold text-center'>{variants[variant].text}</a></div>
  )
}
