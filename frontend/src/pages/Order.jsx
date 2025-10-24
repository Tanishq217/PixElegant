import React, { useContext, useEffect, useState } from 'react'
import Title from '../components/Title'
import { shopDataContext } from '../context/ShopContext'
import { authDataContext } from '../context/AuthContext'
import axios from 'axios'

function Order() {
    let [orderData, setOrderData] = useState([])
    let {currency} = useContext(shopDataContext)
    let {serverURL} = useContext(authDataContext)

    const loadOrderData = async () => {
        try {
            const result = await axios.post(serverURL + '/api/order/userorder', {}, {withCredentials: true})
            if(result.data){
                let allOrdersItem = []
                result.data.map((order) => {
                    order.items.map((item) => {
                        item['status'] = order.status
                        item['payment'] = order.payment
                        item['paymentMethod'] = order.paymentMethod
                        item['date'] = order.date
                        allOrdersItem.push(item)
                    })
                })
                setOrderData(allOrdersItem.reverse())
            }
        } catch (error) {
            console.log("Error loading orders:", error)
        }
    }

    useEffect(() => {
        loadOrderData()
    }, [])

    return (
        <div className='w-full min-h-screen bg-white pt-20 pb-20'>
            <div className='max-w-6xl mx-auto px-4'>
                <div className='text-center mb-12'>
                    <Title text1={'MY'} text2={'ORDERS'} />
                </div>
                
                <div className='space-y-6'>
                    {orderData.length === 0 ? (
                        <div className='text-center py-12'>
                            <p className='text-gray-500 text-lg'>No orders found</p>
                        </div>
                    ) : (
                        orderData.map((item, index) => (
                            <div key={index} className='w-full border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm'>
                                <div className='flex items-center gap-6 p-6'>
                                    <img 
                                        src={item.image1?.startsWith('http') ? item.image1 : `${serverURL}${item.image1}`} 
                                        alt={item.name} 
                                        className='w-32 h-32 rounded-md object-cover'
                                        onError={(e) => e.target.src = '/placeholder-image.jpg'}
                                    />
                                    <div className='flex-1'>
                                        <h3 className='text-xl font-semibold text-black mb-2'>{item.name}</h3>
                                        <div className='flex items-center gap-4 mb-2'>
                                            <p className='text-lg font-bold text-black'>{currency} {item.price}</p>
                                            <p className='text-gray-600'>Quantity: {item.quantity}</p>
                                            <p className='text-gray-600'>Size: {item.size}</p>
                                        </div>
                                        <div className='flex items-center gap-4 mb-2'>
                                            <p className='text-gray-600'>Date: <span className='text-black'>{new Date(item.date).toDateString()}</span></p>
                                        </div>
                                        <div className='flex items-center gap-4'>
                                            <p className='text-gray-600'>Payment Method: {item.paymentMethod}</p>
                                        </div>
                                    </div>
                                    
                                    <div className='flex flex-col items-end gap-4'>
                                        <div className='flex items-center gap-2'>
                                            <div className='w-3 h-3 rounded-full bg-green-500'></div>
                                            <p className='text-black font-medium'>{item.status}</p>
                                        </div>
                                        <button 
                                            className='px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors'
                                            onClick={loadOrderData}
                                        >
                                            Track Order
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}

export default Order
