import React, { useContext } from 'react';
// --- FIX: Import the correct context name ---
import { ShopContext } from '../context/ShopContext'; // Correct name
// --- END OF FIX ---
import { useNavigate } from 'react-router-dom';

function CartTotal() {
    // --- FIX: Use the correct context name ---
    const { getTotalCartAmount, error } = useContext(ShopContext); // Correct name
    // --- END OF FIX ---
    const navigate = useNavigate();

    const totalAmount = getTotalCartAmount(); // Calculate total amount

    const handleProceedToCheckout = () => {
        if (totalAmount > 0) {
            navigate('/order'); // Navigate to the place order page
        } else {
            console.log("Cart is empty, cannot proceed to checkout.");
        }
    };

    // Display error if context provides one
    if (error) {
        return <div className="text-red-500 text-center mt-4">Error calculating totals: {error}</div>;
    }

    return (
        <div className="cart-total bg-white rounded-lg shadow-md p-6 mt-8">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Cart Totals</h2>
            <div className="space-y-3 text-gray-700">
                <div className="flex justify-between border-b pb-2">
                    <span>Subtotal</span>
                    <span>₹{totalAmount}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                    <span>Delivery Fee</span>
                    <span>{totalAmount > 0 ? '₹50' : '₹0'}</span> {/* Example fee */}
                </div>
                <div className="flex justify-between font-semibold text-gray-900 text-lg pt-2">
                    <span>Total</span>
                    <span>₹{totalAmount > 0 ? totalAmount + 50 : 0}</span> {/* Add fee */}
                </div>
            </div>
            <button
                onClick={handleProceedToCheckout}
                disabled={totalAmount === 0}
                className={`w-full mt-6 py-3 px-4 rounded font-semibold text-white transition-colors duration-200 ${
                    totalAmount > 0
                    ? 'bg-black hover:bg-gray-800'
                    : 'bg-gray-400 cursor-not-allowed'
                }`}
            >
                PROCEED TO CHECKOUT
            </button>
        </div>
    );
}

export default CartTotal;