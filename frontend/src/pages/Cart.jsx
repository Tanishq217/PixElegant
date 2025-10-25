import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { authDataContext } from "../context/AuthContext"; // Import AuthContext for serverURL
import { IoTrashOutline } from "react-icons/io5"; // Using react-icons for remove icon
import CartTotal from "../components/CartTotal";
import Loading from "../components/Loading"; // Import Loading component

function Cart() {
  const { all_product, cartItems, removeFromCart, getTotalCartAmount, loading: productsLoading } = useContext(ShopContext); // Get loading state
  const { serverURL } = useContext(authDataContext); // Get serverURL

  // --- FIX: Image URL construction logic ---
  const getImageUrl = (imagePath) => {
    if (!imagePath) {
      return ""; // Or a placeholder image URL
    }
    if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
      return imagePath;
    } else {
      const imageFullPath = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
      return `${serverURL}${imageFullPath}`;
    }
  };
  // --- END OF FIX ---

  // --- FIX: Handle loading state ---
  if (productsLoading || !all_product || all_product.length === 0) {
    // Show loading indicator if products are loading or not yet available
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loading />
      </div>
    );
  }
  // --- END OF FIX ---

  // Get IDs of items currently in the cart
  const cartItemIds = Object.keys(cartItems).filter(itemId => cartItems[itemId] > 0);

  // Check if cart is empty after filtering
  const isCartEmpty = cartItemIds.length === 0;

  return (
    <div className="cart-container min-h-screen bg-gray-100 py-10 px-4 md:px-10">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Your Cart</h1>

      {isCartEmpty ? (
        <p className="text-center text-gray-500 text-lg">Your cart is currently empty.</p>
      ) : (
        <div className="cart-items bg-white rounded-lg shadow-md p-6 mb-8">
          {/* Cart Header */}
          <div className="hidden md:grid grid-cols-6 gap-4 items-center font-semibold text-gray-600 border-b pb-3 mb-4">
            <span className="col-span-2">Product</span>
            <span>Price</span>
            <span>Quantity</span>
            <span>Total</span>
            <span>Remove</span>
          </div>

          {/* Cart Items List - Updated Logic */}
          {cartItemIds.map((itemId) => {
              // Find the product details from all_product using the itemId
              const product = all_product.find((p) => p._id === itemId);

              // --- FIX: Only render if product is found ---
              if (product && cartItems[itemId] > 0) {
                return (
                  <div
                    key={itemId} // Use itemId as key
                    className="grid grid-cols-3 md:grid-cols-6 gap-4 items-center border-b py-4 cart-item-entry"
                  >
                    {/* Product Image & Name (Combined for mobile) */}
                    <div className="col-span-3 md:col-span-2 flex items-center space-x-4">
                      <img
                        src={getImageUrl(product.image1)}
                        alt={product.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <span className="text-sm font-medium text-gray-800">{product.name}</span>
                    </div>

                    {/* Price (Visible on larger screens) */}
                    <span className="hidden md:block text-center text-gray-700">₹{product.price}</span>

                    {/* Quantity */}
                    <span className="text-center">
                      <button className="border rounded px-2 py-1 text-gray-700">{cartItems[itemId]}</button>
                    </span>

                    {/* Total Price */}
                    <span className="text-center font-semibold text-gray-800">
                      ₹{product.price * cartItems[itemId]}
                    </span>

                    {/* Remove Button */}
                    <span className="text-center">
                      <button
                        onClick={() => removeFromCart(itemId)}
                        className="text-red-500 hover:text-red-700 transition-colors duration-200"
                        aria-label={`Remove ${product.name} from cart`}
                      >
                        <IoTrashOutline size={20} />
                      </button>
                    </span>
                  </div>
                );
              }
              return null; // Don't render if product not found for this cart item ID
              // --- END OF FIX ---
          })}
        </div>
      )}

      {/* Cart Totals Section (Only show if cart is not empty) */}
      {!isCartEmpty && <CartTotal />}
    </div>
  );
}

export default Cart;