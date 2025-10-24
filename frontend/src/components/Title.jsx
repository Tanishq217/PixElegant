import React from 'react'

function Title({ text1, text2 }) {
  return (
    <div className="text-center mb-8">
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-2">
        {text1} <span className="text-gray-600">{text2}</span>
      </h2>
      <div className="w-24 h-1 bg-black mx-auto"></div>
    </div>
  )
}

export default Title
