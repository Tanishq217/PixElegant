import React, { useContext, useEffect, useState } from 'react'
import Title from './Title'
import { shopDataContext } from '../context/ShopContext'
import Card from './Card'

function BestSeller() {
    let {products} = useContext(shopDataContext)
    let [bestSellerProducts, setBestSellerProducts] = useState([])

    useEffect(() => {
        // Filter products marked as bestseller
        const bestSellers = products.filter(product => product.bestseller === true).slice(0, 8);
        setBestSellerProducts(bestSellers);
    }, [products])

  return (
    <div className="w-full">
      <div className='text-center mb-12'>
        <Title text1={"BEST"} text2={"SELLERS"}/>
        <p className='text-sm md:text-lg px-4 text-gray-600 max-w-2xl mx-auto'>
          Our Most Loved Products – Customer Favorites!
        </p>
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto'>
        {
            bestSellerProducts.map((item, index) => (
                <Card key={index} name={item.name} image={item.image1} id={item._id} price={item.price}/>
            ))
        }
      </div>
    </div>
  )
}

export default BestSeller