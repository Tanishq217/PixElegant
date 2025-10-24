import React from 'react'
import LatestCollection from '../components/LatestCollection'
import BestSeller from '../components/BestSeller'

function Product() {
  return (
    <div className='w-full min-h-screen bg-white py-20'>
      <div className='max-w-7xl mx-auto px-4'>
        <div className='w-full flex items-center justify-center gap-10 flex-col'>
          <LatestCollection/>
        </div>
        <div className='w-full flex items-center justify-center gap-10 flex-col mt-20'>
          <BestSeller/>
        </div>
      </div>
    </div>
  )
}

export default Product
