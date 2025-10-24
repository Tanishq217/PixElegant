import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { shopDataContext } from '../context/ShopContext'
import { authDataContext } from '../context/AuthContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Loading from '../components/Loading'

function PlaceOrder() {
    let navigate = useNavigate()
    const {cartItem, setCartItem, getCartAmount, delivery_fee, products} = useContext(shopDataContext)
    let {serverURL} = useContext(authDataContext)
    let [loading, setLoading] = useState(false)

    let [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        street: '',
        city: '',
        state: '',
        pinCode: '',
        country: '',
        phone: ''
    })

    const onChangeHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setFormData(data => ({...data, [name]: value}))
    }

    const onSubmitHandler = async (e) => {
        setLoading(true)
        e.preventDefault()
        
        try {
            let orderItems = []
            for(const items in cartItem){
                for(const item in cartItem[items]){
                    if(cartItem[items][item] > 0){
                        const itemInfo = structuredClone(products.find(product => product._id === items))
                        if(itemInfo){
                            itemInfo.size = item
                            itemInfo.quantity = cartItem[items][item]
                            orderItems.push(itemInfo)
                        }
                    }
                }
            }
            
            let orderData = {
                address: formData,
                items: orderItems,
                amount: getCartAmount() + delivery_fee,
                paymentMethod: 'Cash on Delivery'
            }

            const result = await axios.post(serverURL + "/api/order/placeorder", orderData, {withCredentials: true})
            console.log("Order result:", result.data)
            
            if(result.data){
                setCartItem({})
                toast.success("Order Placed Successfully!")
                navigate("/order")
            } else {
                console.log(result.data.message)
                toast.error("Order Placement Error")
            }
        } catch (error) {
            console.log("Order error:", error)
            toast.error("Failed to place order. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='w-full min-h-screen bg-white pt-20 pb-20'>
            <div className='max-w-6xl mx-auto px-4'>
                <div className='flex flex-col lg:flex-row gap-12'>
                    {/* Delivery Information Form */}
                    <div className='lg:w-1/2'>
                        <div className='mb-8'>
                            <Title text1={'DELIVERY'} text2={'INFORMATION'}/>
                        </div>
                        
                        <form onSubmit={onSubmitHandler} className='space-y-6'>
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                <input 
                                    type="text" 
                                    placeholder='First name' 
                                    className='w-full h-12 px-4 rounded-md border border-gray-300 focus:border-black focus:outline-none' 
                                    required 
                                    onChange={onChangeHandler} 
                                    name='firstName' 
                                    value={formData.firstName}
                                />
                                <input 
                                    type="text" 
                                    placeholder='Last name' 
                                    className='w-full h-12 px-4 rounded-md border border-gray-300 focus:border-black focus:outline-none' 
                                    required 
                                    onChange={onChangeHandler} 
                                    name='lastName' 
                                    value={formData.lastName} 
                                />
                            </div>

                            <input 
                                type="email" 
                                placeholder='Email address' 
                                className='w-full h-12 px-4 rounded-md border border-gray-300 focus:border-black focus:outline-none' 
                                required 
                                onChange={onChangeHandler} 
                                name='email' 
                                value={formData.email} 
                            />

                            <input 
                                type="text" 
                                placeholder='Street Address' 
                                className='w-full h-12 px-4 rounded-md border border-gray-300 focus:border-black focus:outline-none' 
                                required 
                                onChange={onChangeHandler} 
                                name='street' 
                                value={formData.street} 
                            />

                            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                <input 
                                    type="text" 
                                    placeholder='City' 
                                    className='w-full h-12 px-4 rounded-md border border-gray-300 focus:border-black focus:outline-none' 
                                    required 
                                    onChange={onChangeHandler} 
                                    name='city' 
                                    value={formData.city} 
                                />
                                <input 
                                    type="text" 
                                    placeholder='State' 
                                    className='w-full h-12 px-4 rounded-md border border-gray-300 focus:border-black focus:outline-none' 
                                    required 
                                    onChange={onChangeHandler} 
                                    name='state' 
                                    value={formData.state} 
                                />
                            </div>

                            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                <input 
                                    type="text" 
                                    placeholder='Pincode' 
                                    className='w-full h-12 px-4 rounded-md border border-gray-300 focus:border-black focus:outline-none' 
                                    required 
                                    onChange={onChangeHandler} 
                                    name='pinCode' 
                                    value={formData.pinCode} 
                                />
                                <input 
                                    type="text" 
                                    placeholder='Country' 
                                    className='w-full h-12 px-4 rounded-md border border-gray-300 focus:border-black focus:outline-none' 
                                    required 
                                    onChange={onChangeHandler} 
                                    name='country' 
                                    value={formData.country} 
                                />
                            </div>

                            <input 
                                type="text" 
                                placeholder='Phone Number' 
                                className='w-full h-12 px-4 rounded-md border border-gray-300 focus:border-black focus:outline-none' 
                                required 
                                onChange={onChangeHandler} 
                                name='phone' 
                                value={formData.phone} 
                            />

                            <button 
                                type='submit' 
                                disabled={loading}
                                className='w-full bg-black text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-800 transition-colors disabled:bg-gray-400 flex items-center justify-center gap-2'
                            >
                                {loading ? <Loading/> : "PLACE ORDER"}
                            </button>
                        </form>
                    </div>

                    {/* Order Summary */}
                    <div className='lg:w-1/2'>
                        <div className='bg-gray-50 p-6 rounded-lg'>
                            <Title text1={'ORDER'} text2={'SUMMARY'}/>
                            <CartTotal/>
                            
                            <div className='mt-6 p-4 bg-green-50 border border-green-200 rounded-lg'>
                                <h3 className='text-lg font-semibold text-green-800 mb-2'>Payment Method</h3>
                                <p className='text-green-700'>Cash on Delivery</p>
                                <p className='text-sm text-green-600 mt-2'>You will pay when your order is delivered</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PlaceOrder
