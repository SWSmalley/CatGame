import React from 'react'

export default function Button({buttonFunction,buttonText}) {
  return (
    <div onClick={buttonFunction} className='text-2xl p-2 bg-white font-mono font-bold text-black'>{buttonText}</div>
  )
}
