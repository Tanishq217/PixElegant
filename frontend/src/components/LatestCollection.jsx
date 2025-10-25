import React, { useContext, useEffect, useState } from 'react'
import Title from './Title'
import { shopDataContext } from '../context/ShopContext'
import Card from './Card'

function LatestCollection() {
    let {products} = useContext(shopDataContext)
    let [latestProducts, setLatestProducts] = useState([])

    useEffect(() => {
        setLatestProducts(products.slice(0, 8));
    }, [products])

  return (
    <div className="w-full">
      <div className='text-center mb-12'>
        <Title text1={"LATEST"} text2={"COLLECTIONS"}/>
        <p className='text-sm md:text-lg px-4 text-gray-600 max-w-2xl mx-auto'>
          Step Into Style – New Collection Dropping This Season!
        </p>
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto'>
        {
            latestProducts.map((item, index) => (
                <Card key={index} name={item.name} image={item.image1} id={item._id} price={item.price}/>
            ))
        }
      </div>
    </div>
  )
}

export default LatestCollection