import React, { useContext } from 'react'
import { shopDataContext } from '../context/ShopContext'
import Title from './Title'

function CartTotal() {
    const {currency, delivery_fee, getCartAmount} = useContext(shopDataContext)
    
    return (
        <div className='w-full'>
            <div className='text-xl py-4'>
                <Title text1={'CART'} text2={'TOTALS'}/>
            </div>
            <div className='flex flex-col gap-4 mt-4 text-sm p-6 border border-gray-300 bg-gray-50 rounded-lg'>
                <div className='flex justify-between text-black text-lg py-2'>
                    <p>Subtotal</p>
                    <p>{currency} {getCartAmount()}.00</p>
                </div>
                <hr className='border-gray-300'/>
                <div className='flex justify-between text-black text-lg py-2'>
                    <p>Shipping Fee</p>
                    <p>{currency} {delivery_fee}</p>
                </div>
                <hr className='border-gray-300'/>
                <div className='flex justify-between text-black text-lg py-2 font-bold'>
                    <p>Total</p>
                    <p>{currency} {getCartAmount() === 0 ? 0 : getCartAmount() + delivery_fee}</p>
                </div>
            </div>
        </div>
    )
}

export default CartTotal
