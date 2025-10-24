import React from 'react'
import Title from '../components/Title'
import about from '../assets/untitled folder/about.jpg'
import NewLetterBox from '../components/NewLetterBox'

function About() {
  return (
    <div className='w-full min-h-screen bg-white pt-20 pb-20'>
      <div className='max-w-6xl mx-auto px-4'>
        <div className='text-center mb-12'>
          <Title text1={'ABOUT'} text2={'US'}/>
        </div>
        
        <div className='flex flex-col lg:flex-row gap-12 items-center mb-16'>
          <div className='lg:w-1/2 w-full flex justify-center'>
            <img 
              src={about} 
              alt="About Us" 
              className='w-full max-w-md shadow-lg rounded-lg'
              onError={(e) => e.target.src = '/placeholder-image.jpg'}
            />
          </div>
          
          <div className='lg:w-1/2 w-full space-y-6'>
            <div className='text-gray-700 space-y-4'>
              <p>
                PixElegant born for smart, seamless shopping—created to deliver quality products, trending styles, and everyday essentials in one place. With reliable service, fast delivery, and great value, PixElegant makes your online shopping experience simple, satisfying, and stress-free.
              </p>
              <p>
                Modern shoppers—combining style, convenience, and affordability. Whether it's fashion, essentials, or trends, we bring everything you need to one trusted platform with fast delivery, easy returns, and a customer-first shopping experience you'll love.
              </p>
            </div>
            
            <div>
              <h3 className='text-xl font-bold text-black mb-4'>Our Mission</h3>
              <p className='text-gray-700'>
                Our mission is to redefine online shopping by delivering quality, affordability, and convenience. PixElegant connects customers with trusted products and brands, offering a seamless, customer-focused experience that saves time, adds value, and fits every lifestyle and need.
              </p>
            </div>
          </div>
        </div>
        
        <div className='text-center mb-12'>
          <Title text1={'WHY'} text2={'CHOOSE US'}/>
        </div>
        
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16'>
          <div className='text-center p-8 border border-gray-200 rounded-lg bg-gray-50'>
            <h3 className='text-xl font-semibold text-black mb-4'>Quality Assurance</h3>
            <p className='text-gray-700'>
              We guarantee quality through strict checks, reliable sourcing, and a commitment to customer satisfaction always.
            </p>
          </div>
          
          <div className='text-center p-8 border border-gray-200 rounded-lg bg-gray-50'>
            <h3 className='text-xl font-semibold text-black mb-4'>Convenience</h3>
            <p className='text-gray-700'>
              Shop easily with fast delivery, simple navigation, secure checkout, and everything you need in one place.
            </p>
          </div>
          
          <div className='text-center p-8 border border-gray-200 rounded-lg bg-gray-50'>
            <h3 className='text-xl font-semibold text-black mb-4'>Exceptional Customer Service</h3>
            <p className='text-gray-700'>
              Our dedicated support team ensures quick responses, helpful solutions, and a smooth shopping experience every time.
            </p>
          </div>
        </div>
        
        <NewLetterBox/>
      </div>
    </div>
  )
}

export default About