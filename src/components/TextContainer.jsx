import React from 'react'

export default function TextContainer({children}) {
  return (
    <div className= "  w-1/5 min-w-64 flex flex-col border-sky-900 border-4 rounded-md justify-center items-center">
        {children}
    </div>
  )
}
