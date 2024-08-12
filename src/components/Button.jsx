import React from 'react'

export default function Button({buttonFunction,buttonText,className}) {
  return (
    <div onClick={buttonFunction} className={`cursor-pointer text-2xl p-2 bg-white font-mono font-bold text-black ${className}`}>{buttonText}</div>
  )
}
