import React from 'react'
import Title from '../components/Title'
import contact from "../assets/untitled folder/contact.jpg"
import NewLetterBox from '../components/NewLetterBox'

function Contact() {
  return (
    <div className='w-full min-h-screen bg-white pt-20 pb-20'>
      <div className='max-w-6xl mx-auto px-4'>
        <div className='text-center mb-12'>
          <Title text1={'CONTACT'} text2={'US'}/>
        </div>
        
        <div className='flex flex-col lg:flex-row gap-12 items-center'>
          <div className='lg:w-1/2 w-full flex justify-center'>
            <img 
              src={contact} 
              alt="Contact" 
              className='w-full max-w-md shadow-lg rounded-lg'
              onError={(e) => e.target.src = '/placeholder-image.jpg'}
            />
          </div>
          
          <div className='lg:w-1/2 w-full space-y-6'>
            <div>
              <h3 className='text-xl font-bold text-black mb-4'>Our Store</h3>
              <div className='text-gray-700 space-y-2'>
                <p>12345 Random Station</p>
                <p>Random City, State, India</p>
              </div>
            </div>
            
            <div>
              <h3 className='text-xl font-bold text-black mb-4'>Contact Information</h3>
              <div className='text-gray-700 space-y-2'>
                <p>Tel: +91-9876543210</p>
                <p>Email: admin@pixelegant.com</p>
              </div>
            </div>
            
            <div>
              <h3 className='text-xl font-bold text-black mb-4'>Careers at PixElegant</h3>
              <p className='text-gray-700 mb-4'>Learn more about our teams and job openings</p>
              <button className='px-6 py-3 bg-black text-white rounded-md hover:bg-gray-800 transition-colors'>
                Explore Jobs
              </button>
            </div>
          </div>
        </div>
        
        <div className='mt-16'>
          <NewLetterBox/>
        </div>
      </div>
    </div>
  )
}

export default Contact