import React, { useContext } from 'react'
import { shopDataContext } from '../context/ShopContext'
import { useNavigate } from 'react-router-dom'
import { authDataContext } from '../context/AuthContext'

function Card({name, image, id, price}) {
    let {currency} = useContext(shopDataContext)
    let {serverURL} = useContext(authDataContext)
    let navigate = useNavigate()
    
    // Fix image URL for local storage
    const imageUrl = image?.startsWith('http') ? image : `${serverURL}${image}`
    
  return (
    <div 
      className='w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer overflow-hidden' 
      onClick={() => navigate(`/product/${id}`)}
    >
        <div className='aspect-square overflow-hidden'>
          <img 
            src={imageUrl} 
            alt={name} 
            className='w-full h-full object-cover hover:scale-110 transition-transform duration-300'
            onError={(e) => {
              e.target.src = '/placeholder-image.jpg';
              e.target.alt = 'Image not available';
            }}
          />
        </div>
        <div className='p-4'>
          <h3 className='text-lg font-semibold text-black mb-2 line-clamp-2'>{name}</h3>
          <p className='text-xl font-bold text-black'>{currency} {price}</p>
        </div>
    </div>
  )
}

export default Card