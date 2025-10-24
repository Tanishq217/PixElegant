import React, { useContext, useEffect, useState } from 'react'
import Title from '../components/Title'
import { shopDataContext } from '../context/ShopContext'
import { useNavigate } from 'react-router-dom'
import { RiDeleteBin6Line } from "react-icons/ri";
import CartTotal from '../components/CartTotal';
import { authDataContext } from '../context/AuthContext';

function Cart() {
    const { products, currency, cartItem, updateQuantity } = useContext(shopDataContext)
    const { serverURL } = useContext(authDataContext)
    const [cartData, setCartData] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const tempData = [];
        for (const items in cartItem) {
            for (const item in cartItem[items]) {
                if (cartItem[items][item] > 0) {
                    tempData.push({
                        _id: items,
                        size: item,
                        quantity: cartItem[items][item],
                    });
                }
            }
        }
        setCartData(tempData); 
    }, [cartItem]);

    return (
        <div className='w-full min-h-screen bg-white pt-20 pb-20'>
            <div className='max-w-4xl mx-auto px-4'>
                <div className='text-center mb-12'>
                    <Title text1={'YOUR'} text2={'CART'} />
                </div>

                <div className='space-y-6 mb-12'>
                    {
                        cartData.map((item, index) => {
                            const productData = products.find((product) => product._id === item._id);
                            if (!productData) return null;
                            
                            const imageUrl = productData.image1?.startsWith('http') ? productData.image1 : `${serverURL}${productData.image1}`;
                            
                            return (
                                <div key={index} className='w-full border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm'>
                                    <div className='flex items-center gap-6 p-6'>
                                        <img 
                                            className='w-24 h-24 rounded-md object-cover' 
                                            src={imageUrl} 
                                            alt={productData.name}
                                            onError={(e) => {
                                                e.target.src = '/placeholder-image.jpg';
                                                e.target.alt = 'Image not available';
                                            }}
                                        />
                                        <div className='flex-1'>
                                            <h3 className='text-xl font-semibold text-black mb-2'>{productData.name}</h3>
                                            <div className='flex items-center gap-4'>
                                                <p className='text-lg font-bold text-black'>{currency} {productData.price}</p>
                                                <span className='px-3 py-1 bg-gray-100 text-black rounded-md text-sm font-medium'>
                                                    Size: {item.size}
                                                </span>
                                            </div>
                                        </div>
                                        
                                        <div className='flex items-center gap-4'>
                                            <input 
                                                type="number" 
                                                min={1} 
                                                defaultValue={item.quantity} 
                                                className='w-16 h-10 px-2 text-center text-black border border-gray-300 rounded-md focus:border-black focus:outline-none' 
                                                onChange={(e) => {
                                                    const value = Number(e.target.value);
                                                    if (value > 0) {
                                                        updateQuantity(item._id, item.size, value);
                                                    }
                                                }} 
                                            />
                                            <button 
                                                className='text-red-500 hover:text-red-700 transition-colors'
                                                onClick={() => updateQuantity(item._id, item.size, 0)}
                                            >
                                                <RiDeleteBin6Line className='w-6 h-6' />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>

                {cartData.length === 0 && (
                    <div className='text-center py-12'>
                        <p className='text-gray-500 text-lg mb-4'>Your cart is empty</p>
                        <button 
                            className='bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors'
                            onClick={() => navigate('/collections')}
                        >
                            Continue Shopping
                        </button>
                    </div>
                )}

                {cartData.length > 0 && (
                    <div className='flex justify-end'>
                        <div className='w-full sm:w-96'>
                            <CartTotal/>
                            <button 
                                className='w-full bg-black text-white py-3 px-6 rounded-lg hover:bg-gray-800 transition-colors font-semibold mt-4' 
                                onClick={() => navigate("/placeorder")}
                            >
                                PROCEED TO CHECKOUT
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Cart
