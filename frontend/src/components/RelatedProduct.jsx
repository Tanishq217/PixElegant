import React, { useContext, useEffect, useState } from 'react'
import { shopDataContext } from '../context/ShopContext'
import Title from './Title'
import Card from './Card'

function RelatedProduct({category, subCategory, currentProductId}) {
    let {products} = useContext(shopDataContext)
    let [related, setRelated] = useState([])

    useEffect(() => {
        if(products.length > 0){
            let productsCopy = products.slice()
            productsCopy = productsCopy.filter((item) => category === item.category)
            productsCopy = productsCopy.filter((item) => subCategory === item.subCategory)
            productsCopy = productsCopy.filter((item) => currentProductId !== item._id)
            setRelated(productsCopy.slice(0, 4))
        }
    }, [products, category, subCategory, currentProductId])

    return (
        <div className='my-20'>
            <div className='text-center mb-12'>
                <Title text1={'RELATED'} text2={'PRODUCTS'}/>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto'>
                {
                    related.map((item, index) => (
                        <Card key={index} id={item._id} name={item.name} price={item.price} image={item.image1} />
                    ))
                }
            </div>
        </div>
    )
}

export default RelatedProduct
