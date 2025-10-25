import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { shopDataContext } from '../context/ShopContext'
import { authDataContext } from '../context/AuthContext'
import { FaStar } from "react-icons/fa";
import { FaStarHalfAlt } from "react-icons/fa";
import RelatedProduct from '../components/RelatedProduct';
import Loading from '../components/Loading';

function ProductDetail() {
    let {id} = useParams()
    let {products, currency, addtoCart, loading} = useContext(shopDataContext)
    let {serverURL} = useContext(authDataContext)
    let [productData, setProductData] = useState(false)

    const [image, setImage] = useState('')
    const [image1, setImage1] = useState('')
    const [image2, setImage2] = useState('')
    const [image3, setImage3] = useState('')
    const [image4, setImage4] = useState('')
    const [size, setSize] = useState('')

    const fetchProductData = async () => {
        products.map((item) => {
            if (item._id === id) {
                setProductData(item)
                console.log("Product data:", productData)
                setImage1(item.image1)
                setImage2(item.image2)
                setImage3(item.image3)
                setImage4(item.image4)
                setImage(item.image1)
                return null;
            }
        })
    }

    useEffect(() => {
        fetchProductData()
    }, [id, products])

    const getImageUrl = (img) => {
        return img?.startsWith('http') ? img : `${serverURL}${img}`
    }

    return productData ? (
        <div className='w-full min-h-screen bg-white'>
            <div className='max-w-7xl mx-auto px-4 pt-20 pb-20'>
                <div className='flex flex-col lg:flex-row gap-12'>
                    {/* Image Gallery */}
                    <div className='lg:w-1/2 flex flex-col lg:flex-row gap-6'>
                        {/* Thumbnail Images */}
                        <div className='flex lg:flex-col gap-4 order-2 lg:order-1'>
                            <div className='w-20 h-20 border border-gray-300 rounded-md overflow-hidden cursor-pointer hover:border-black transition-colors'>
                                <img 
                                    src={getImageUrl(image1)} 
                                    alt="" 
                                    className='w-full h-full object-cover' 
                                    onClick={() => setImage(image1)}
                                    onError={(e) => e.target.src = '/placeholder-image.jpg'}
                                />
                            </div>
                            <div className='w-20 h-20 border border-gray-300 rounded-md overflow-hidden cursor-pointer hover:border-black transition-colors'>
                                <img 
                                    src={getImageUrl(image2)} 
                                    alt="" 
                                    className='w-full h-full object-cover' 
                                    onClick={() => setImage(image2)}
                                    onError={(e) => e.target.src = '/placeholder-image.jpg'}
                                />
                            </div>
                            <div className='w-20 h-20 border border-gray-300 rounded-md overflow-hidden cursor-pointer hover:border-black transition-colors'>
                                <img 
                                    src={getImageUrl(image3)} 
                                    alt="" 
                                    className='w-full h-full object-cover' 
                                    onClick={() => setImage(image3)}
                                    onError={(e) => e.target.src = '/placeholder-image.jpg'}
                                />
                            </div>
                            <div className='w-20 h-20 border border-gray-300 rounded-md overflow-hidden cursor-pointer hover:border-black transition-colors'>
                                <img 
                                    src={getImageUrl(image4)} 
                                    alt="" 
                                    className='w-full h-full object-cover' 
                                    onClick={() => setImage(image4)}
                                    onError={(e) => e.target.src = '/placeholder-image.jpg'}
                                />
                            </div>
                        </div>
                        
                        {/* Main Image */}
                        <div className='flex-1 order-1 lg:order-2'>
                            <div className='aspect-square border border-gray-300 rounded-lg overflow-hidden'>
                                <img 
                                    src={getImageUrl(image)} 
                                    alt={productData.name} 
                                    className='w-full h-full object-cover' 
                                    onError={(e) => e.target.src = '/placeholder-image.jpg'}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className='lg:w-1/2 space-y-6'>
                        <div>
                            <h1 className='text-4xl font-bold text-black mb-4'>{productData.name.toUpperCase()}</h1>
                            <div className='flex items-center gap-2 mb-4'>
                                <FaStar className='text-yellow-400' />
                                <FaStar className='text-yellow-400' />
                                <FaStar className='text-yellow-400' />
                                <FaStar className='text-yellow-400' />
                                <FaStarHalfAlt className='text-yellow-400' />
                                <span className='text-gray-600 ml-2'>(124 reviews)</span>
                            </div>
                            <p className='text-3xl font-bold text-black mb-6'>{currency} {productData.price}</p>
                            <p className='text-lg text-gray-700 mb-6'>{productData.description}</p>
                        </div>

                        {/* Size Selection */}
                        <div className='space-y-4'>
                            <h3 className='text-xl font-semibold text-black'>Select Size</h3>
                            <div className='flex gap-3'>
                                {productData.sizes.map((item, index) => (
                                    <button 
                                        key={index} 
                                        className={`border border-gray-300 py-2 px-4 rounded-md transition-colors ${
                                            item === size 
                                                ? 'bg-black text-white border-black' 
                                                : 'bg-white text-black hover:border-black'
                                        }`} 
                                        onClick={() => setSize(item)}
                                    >
                                        {item}
                                    </button>
                                ))}
                            </div>
                            <button 
                                className='w-full bg-black text-white py-3 px-6 rounded-lg hover:bg-gray-800 transition-colors font-semibold disabled:bg-gray-400' 
                                onClick={() => addtoCart(productData._id, size)}
                                disabled={!size || loading}
                            >
                                {loading ? <Loading/> : "Add to Cart"}
                            </button>
                        </div>

                        {/* Product Features */}
                        <div className='border-t border-gray-300 pt-6'>
                            <div className='space-y-2 text-gray-700'>
                                <p>✓ 100% Original Product</p>
                                <p>✓ Cash on delivery available</p>
                                <p>✓ Easy return and exchange policy within 7 days</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Product Description */}
                <div className='mt-20'>
                    <div className='flex gap-4 mb-6'>
                        <button className='border border-gray-300 px-6 py-3 text-black hover:bg-gray-50 transition-colors'>
                            Description
                        </button>
                        <button className='border border-gray-300 px-6 py-3 text-black hover:bg-gray-50 transition-colors'>
                            Reviews (124)
                        </button>
                    </div>
                    <div className='bg-gray-50 border border-gray-300 p-8 rounded-lg'>
                        <p className='text-gray-700 leading-relaxed'>
                            Upgrade your wardrobe with this stylish slim-fit cotton shirt, available now on PixElegant. 
                            Crafted from breathable, high-quality fabric, it offers all-day comfort and effortless style. 
                            Easy to maintain and perfect for any setting, this shirt is a must-have essential for those 
                            who value both fashion and function.
                        </p>
                    </div>
                </div>

                {/* Related Products */}
                <div className='mt-20'>
                    <RelatedProduct category={productData.category} subCategory={productData.subCategory} currentProductId={productData._id}/>
                </div>
            </div>
        </div>
    ) : (
        <div className='w-full min-h-screen bg-white flex items-center justify-center'>
            <div className='text-center'>
                <h2 className='text-2xl font-bold text-black mb-4'>Product Not Found</h2>
                <p className='text-gray-600'>The product you're looking for doesn't exist.</p>
            </div>
        </div>
    )
}

export default ProductDetail