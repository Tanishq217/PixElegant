import React, { useContext, useEffect, useState } from 'react';
import Title from '../components/Title';
// --- FIX: Correct the context import name ---
import { ShopContext } from '../context/ShopContext'; // Changed from shopDataContext
// --- END OF FIX ---
import { authDataContext } from '../context/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify'; // Import toast
import Loading from '../components/Loading'; // Import Loading

function Order() {
    let [orderData, setOrderData] = useState([]);
    // --- FIX: Use the correct context name ---
    const { all_product, loading: productsLoading, error: productsError } = useContext(ShopContext); // Use ShopContext and get product loading/error states
    // --- END OF FIX ---
    const { serverURL } = useContext(authDataContext);
    const [ordersLoading, setOrdersLoading] = useState(true); // Separate loading state for orders
    const [ordersError, setOrdersError] = useState(null);    // Separate error state for orders

    // --- FIX: Image URL construction logic ---
    const getImageUrl = (imagePath) => {
        if (!imagePath) {
            return "/placeholder-image.jpg"; // Provide a placeholder
        }
        if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
            return imagePath;
        } else {
            const imageFullPath = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
            // Ensure serverURL doesn't end with a slash if imageFullPath starts with one
            const baseUrl = serverURL.endsWith('/') ? serverURL.slice(0, -1) : serverURL;
            return `${baseUrl}${imageFullPath}`;
        }
    };
    // --- END OF FIX ---

    const loadOrderData = async () => {
        setOrdersLoading(true);
        setOrdersError(null);
        try {
            console.log("Fetching user orders from:", `${serverURL}/api/order/userorder`);
            const result = await axios.post(`${serverURL}/api/order/userorder`, {}, { withCredentials: true });
            console.log("User orders fetched:", result.data);

            if (result.data && Array.isArray(result.data)) {
                 // Sort orders by creation date, newest first
                const sortedOrders = result.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setOrderData(sortedOrders); // Store the full order objects
            } else {
                setOrderData([]); // Set to empty array if no orders or unexpected format
            }
        } catch (error) {
            console.error("Error loading orders:", error.response?.data || error.message);
            setOrdersError(error.response?.data?.message || "Failed to load orders.");
            setOrderData([]); // Clear orders on error
            // Check for authorization error (e.g., token expired)
            if (error.response?.status === 401 || error.response?.status === 400) {
                 toast.error("Please log in again to view your orders.");
                 // Optionally redirect to login
            } else {
                 toast.error("Could not fetch orders.");
            }
        } finally {
            setOrdersLoading(false);
        }
    };


    useEffect(() => {
        // Fetch orders only if serverURL is available
        if (serverURL) {
            loadOrderData();
        } else {
             console.log("serverURL not ready, skipping order fetch.");
             setOrdersLoading(false); // Stop loading if no URL
             setOrdersError("Configuration error. Cannot fetch orders.");
        }
    }, [serverURL]); // Depend on serverURL

    return (
        <div className='w-full min-h-screen bg-gray-50 pt-20 pb-20'> {/* Changed background */}
            <div className='max-w-7xl mx-auto px-4'>
                <div className='text-center mb-12'>
                    <Title text1={'MY'} text2={'ORDERS'} />
                </div>

                {ordersLoading ? (
                    <div className='flex justify-center items-center py-12'>
                        <Loading /> {/* Use your loading component */}
                    </div>
                ) : ordersError ? (
                     <div className='text-center py-12 text-red-600'>
                         <p>{ordersError}</p>
                     </div>
                 ) : orderData.length === 0 ? (
                    <div className='text-center py-12'>
                        <p className='text-gray-500 text-lg'>You haven't placed any orders yet.</p>
                    </div>
                ) : (
                    <div className='space-y-8'>
                        {/* Map through each order */}
                        {orderData.map((order) => (
                            <div key={order._id} className='w-full border border-gray-200 rounded-lg overflow-hidden bg-white shadow-md'>
                                <div className='bg-gray-100 px-6 py-3 border-b border-gray-200 flex justify-between items-center'>
                                     <div>
                                        <p className='text-sm text-gray-600'>Order Placed: <span className='font-medium text-black'>{new Date(order.createdAt).toLocaleDateString()}</span></p>
                                        <p className='text-sm text-gray-600'>Order ID: <span className='font-medium text-black'>{order._id}</span></p>
                                     </div>
                                      <div className='flex items-center gap-2'>
                                            <div className={`w-3 h-3 rounded-full ${order.status === 'Delivered' ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                                            <p className='text-sm font-medium text-black'>{order.status}</p>
                                        </div>
                                </div>
                                {/* Map through items within each order */}
                                <div className='divide-y divide-gray-200'>
                                {order.items.map((item, index) => (
                                    <div key={index} className='flex items-center gap-6 p-6'>
                                        <img
                                            src={getImageUrl(item.image1)}
                                            alt={item.name}
                                            className='w-24 h-24 rounded-md object-cover flex-shrink-0' // Adjusted size
                                            onError={(e) => e.target.src = '/placeholder-image.jpg'}
                                        />
                                        <div className='flex-1'>
                                            <h3 className='text-lg font-semibold text-black mb-1'>{item.name}</h3>
                                            <div className='flex items-center gap-4 text-sm text-gray-600 mb-2'>
                                                <span>Quantity: {item.quantity}</span>
                                                {item.size && <span>Size: {item.size}</span>} {/* Conditionally render size */}
                                            </div>
                                             <p className='text-md font-bold text-black'>₹ {item.price}</p>
                                        </div>
                                    </div>
                                ))}
                                </div>
                                <div className='bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-between items-center'>
                                      <p className='text-sm text-gray-600'>Payment: <span className='font-medium text-black'>{order.paymentMethod} ({order.payment ? "Paid" : "Pending"})</span></p>
                                      <p className='text-md font-bold text-black'>Total: ₹ {order.amount}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
             <ToastContainer position="bottom-right" autoClose={3000} /> {/* Add ToastContainer here */}
        </div>
    );
}

export default Order;