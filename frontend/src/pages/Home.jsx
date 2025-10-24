import React, { useEffect, useState } from 'react'
import Hero from '../components/Hero'
import Product from './Product'
import OurPolicy from '../components/OurPolicy'
import NewLetterBox from '../components/NewLetterBox'
import Footer from '../components/Footer'

function Home() {
  let heroData = [
    {text1: "30% OFF Limited Offer", text2: "Style that"},
    {text1: "Discover the Best of Bold Fashion", text2: "Limited Time Only!"},
    {text1: "Explore Our Best Collection", text2: "Shop Now!"},
    {text1: "Choose your Perfect Fashion Fit", text2: "Now on Sale!"}
  ]

  let [heroCount, setHeroCount] = useState(0)

  useEffect(() => {
    let interval = setInterval(() => {
      setHeroCount(prevCount => (prevCount === 3 ? 0 : prevCount + 1));
    }, 3000);
    return () => clearInterval(interval)
  }, [])
  
  return (
    <div className='overflow-x-hidden bg-white'>
      <div className='w-full lg:h-[100vh] md:h-[50vh] sm:h-[30vh] bg-gradient-to-l from-gray-900 to-gray-700'>
        <Hero
          heroCount={heroCount}
          setHeroCount={setHeroCount}
          heroData={heroData[heroCount]}
        />
      </div>
      <Product/>
      <OurPolicy/>
      <NewLetterBox/>
      <Footer/>
    </div>
  )
}

export default Home
