import React, { useContext, useState } from 'react';
import Title from '../components/Title';
import CartTotal from '../components/CartTotal';
// --- FIX: Import the correct context name ---
import { ShopContext } from '../context/ShopContext'; // Changed from shopDataContext
// --- END OF FIX ---
import { authDataContext } from '../context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Loading from '../components/Loading'; // Assuming you have a Loading component

function PlaceOrder() {
    // --- FIX: Use the correct context name ---
    const { getTotalCartAmount, all_product, cartItems } = useContext(ShopContext); // Changed from shopDataContext
    // --- END OF FIX ---
    const { serverURL } = useContext(authDataContext);
    const navigate = useNavigate();

    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        street: "",
        city: "",
        state: "",
        zipCode: "",
        country: "",
        phone: ""
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setData(prevData => ({ ...prevData, [name]: value }));
    };

    const placeOrder = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError("");

        let orderItems = [];
        all_product.forEach((item) => {
            if (cartItems[item._id] > 0) {
                let itemInfo = { ...item, quantity: cartItems[item._id] };
                orderItems.push(itemInfo);
            }
        });

        let orderData = {
            address: data,
            items: orderItems,
            amount: getTotalCartAmount() + 50, // Assuming 50 is delivery charge
        };

        const token = localStorage.getItem('token');
        if (!token) {
            setError("Authentication required to place order.");
            setLoading(false);
            return;
        }

        try {
            console.log("Placing order with data:", orderData);
            const response = await axios.post(
                `${serverURL}/api/order/place`,
                orderData,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            console.log("Order response:", response.data);

            if (response.data.success) {
                // Handle successful order placement (e.g., clear cart, redirect, show success message)
                alert("Order placed successfully!"); // Replace with better UX
                // navigate('/myorders'); // Or wherever you want to redirect
                // Optionally clear cart data here
            } else {
                setError(response.data.message || "Failed to place order.");
            }
        } catch (err) {
            console.error("Error placing order:", err);
            setError("An error occurred while placing the order. " + (err.response?.data?.message || err.message));
             if (err.response?.status === 401) {
                 localStorage.removeItem('token');
                 navigate('/login'); // Redirect to login if unauthorized
             }
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="py-12 px-4 md:px-10 bg-gray-50 min-h-screen">
            <Title title="Place Your Order" />

            <form onSubmit={placeOrder} className="place-order max-w-4xl mx-auto flex flex-col md:flex-row gap-8 md:gap-12 mt-8">
                {/* Left Side: Delivery Information */}
                <div className="place-order-left flex-1 space-y-4">
                    <h2 className="text-xl font-bold mb-4 text-gray-800 border-b pb-2">Delivery Information</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <input required name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder='First Name' className='border border-gray-300 p-2 rounded focus:outline-none focus:ring-1 focus:ring-black' />
                        <input required name='lastName' onChange={onChangeHandler} value={data.lastName} type="text" placeholder='Last Name' className='border border-gray-300 p-2 rounded focus:outline-none focus:ring-1 focus:ring-black' />
                    </div>
                    <input required name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Email address' className='border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-1 focus:ring-black' />
                    <input required name='street' onChange={onChangeHandler} value={data.street} type="text" placeholder='Street' className='border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-1 focus:ring-black' />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <input required name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder='City' className='border border-gray-300 p-2 rounded focus:outline-none focus:ring-1 focus:ring-black' />
                        <input required name='state' onChange={onChangeHandler} value={data.state} type="text" placeholder='State' className='border border-gray-300 p-2 rounded focus:outline-none focus:ring-1 focus:ring-black' />
                    </div>
                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <input required name='zipCode' onChange={onChangeHandler} value={data.zipCode} type="text" placeholder='Zip code' className='border border-gray-300 p-2 rounded focus:outline-none focus:ring-1 focus:ring-black' />
                        <input required name='country' onChange={onChangeHandler} value={data.country} type="text" placeholder='Country' className='border border-gray-300 p-2 rounded focus:outline-none focus:ring-1 focus:ring-black' />
                    </div>
                    <input required name='phone' onChange={onChangeHandler} value={data.phone} type="text" placeholder='Phone' className='border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-1 focus:ring-black' />

                    {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

                    {/* Placeholder for Payment Section if needed later */}
                     {/* <h2 className="text-xl font-bold mt-8 mb-4 text-gray-800 border-b pb-2">Payment Method</h2> */}
                     {/* Payment options here */}
                </div>

                {/* Right Side: Cart Totals */}
                <div className="place-order-right w-full md:w-1/3">
                     {/* Use CartTotal component */}
                    <CartTotal />
                    <button
                        type='submit'
                        disabled={loading || getTotalCartAmount() === 0} // Disable if loading or cart empty
                        className={`w-full mt-6 py-3 px-4 rounded font-semibold text-white transition-colors duration-200 flex items-center justify-center gap-2 ${
                            loading || getTotalCartAmount() === 0
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-black hover:bg-gray-800'
                        }`}
                    >
                       {loading ? <Loading/> : "PLACE ORDER"}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default PlaceOrder;