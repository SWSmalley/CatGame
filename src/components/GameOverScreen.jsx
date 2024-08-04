import React from 'react'
import badEnd from "../assets/badEnd.png"
import cat from '../assets/cat.png'
import Button from './Button'

export default function GameOverScreen({variant,buttonFunction,level}) {
  const variants = {
    "lose" : { 
      "text" : "Caught! Dine only on bitter defeat",
      "image" : badEnd,
      "buttonText" : "Try Again",
    },

    "win" : {
      "text" : "Glory in victory!",
      "image" : cat,
      "buttonText" : "I hunger still"
    },

    
  }
  console.log("level and variant = ", level,variant)
  return (
    <div className=' flex flex-col opacity-0 transition-opacity duration-1000 hover:opacity-100 w-full aspect-square bg-black absolute z-20 items-center justify-center text-white'>
      <img src = {variants[variant].image} className='w-2/3 pixelated m-auto '/>
      <a className='m-auto xl:text-2xl font-bold text-center'>{variants[variant].text}</a>
      {level>3 && variant == "win" ?<a className='m-auto xl:text-2xl font-bold text-center'>At last your hunger is sated.</a> :<Button buttonFunction={buttonFunction} buttonText={variants[variant].buttonText}/>}
    </div>
  )
}
