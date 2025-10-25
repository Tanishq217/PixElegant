import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { authDataContext } from "./AuthContext"; // Assuming correct path

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
  const { serverURL } = useContext(authDataContext);
  const [all_product, setAll_Product] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [loading, setLoading] = useState(true); // <-- Add loading state, true initially
  const [error, setError] = useState(null);   // <-- Add error state

  // Fetch all products
  const fetchProducts = async () => {
    setLoading(true); // <-- Set loading true before fetch
    setError(null);   // <-- Clear previous errors
    try {
      console.log("Fetching products from:", `${serverURL}/api/product/listproduct`);
      const response = await axios.get(`${serverURL}/api/product/listproduct`);
      console.log("Products fetched:", response.data);
      setAll_Product(response.data);
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("Failed to load products."); // <-- Set error message
      setAll_Product([]); // Clear products on error
    } finally {
      setLoading(false); // <-- Set loading false after fetch (success or fail)
    }
  };

  // Fetch cart data
  const fetchCart = async () => {
    const token = localStorage.getItem('token'); // Assuming token is stored in localStorage
    if (token && serverURL) { // Check if serverURL is available
      try {
        console.log("Fetching cart data from:", `${serverURL}/api/cart/getcart`);
        const response = await axios.post(
          `${serverURL}/api/cart/getcart`,
          {}, // Empty body needed for POST
          { headers: { Authorization: `Bearer ${token}` } } // Send token in header
        );
        console.log("Cart data fetched:", response.data);
        setCartItems(response.data); // Assuming response.data is the cart object {itemId: quantity}
      } catch (err) {
        console.error("Error fetching cart data:", err);
        // Handle error (e.g., clear cartItems, show message)
        // If token is invalid (401), you might want to log the user out
        if (err.response?.status === 401) {
             console.log("Unauthorized fetching cart. Token might be invalid.");
             localStorage.removeItem('token'); // Example: remove invalid token
             setCartItems({}); // Reset cart
             // Optionally redirect to login or show a message
        } else {
             setError("Failed to load cart data.");
        }

      }
    } else {
        console.log("No token or serverURL found, skipping cart fetch.");
        setCartItems({}); // Ensure cart is empty if no token
    }
  };

  // Initial data fetch
  useEffect(() => {
    if (serverURL) { // Only fetch if serverURL is available
      fetchProducts();
      // Fetch cart only if user is logged in (token exists)
      if (localStorage.getItem('token')) {
        fetchCart();
      } else {
        // If no token, ensure cart state is empty
        setCartItems({});
      }
    }
  }, [serverURL]); // Re-run if serverURL changes (e.g., on initial load)

  // Add to cart
  const addToCart = async (itemId) => {
    const token = localStorage.getItem('token');
     if (!token) {
        // Handle case where user is not logged in (e.g., redirect to login, show message)
        console.log("User not logged in. Cannot add to cart.");
        alert("Please log in to add items to your cart."); // Simple alert, replace with better UX
        return;
    }

    setCartItems((prev) => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }));

    try {
        await axios.post(
            `${serverURL}/api/cart/addtocart`,
            { itemId },
            { headers: { Authorization: `Bearer ${token}` } }
        );
         console.log(`Item ${itemId} added to cart on backend.`);
    } catch (err) {
        console.error("Error adding item to cart:", err);
        // Revert frontend state if backend fails
        setCartItems((prev) => {
            const newCart = { ...prev };
            if (newCart[itemId] > 1) {
                newCart[itemId] -= 1;
            } else {
                delete newCart[itemId];
            }
            return newCart;
        });
        setError("Failed to add item to cart. Please try again.");
         if (err.response?.status === 401) {
             console.log("Unauthorized adding to cart. Token might be invalid.");
             localStorage.removeItem('token');
             // Optionally redirect to login
        }
    }
  };

  // Remove from cart
  const removeFromCart = async (itemId) => {
     const token = localStorage.getItem('token');
     if (!token) {
        console.log("User not logged in. Cannot remove from cart.");
        return; // Or show message
    }

    // Store current quantity in case we need to revert
    const currentQuantity = cartItems[itemId];

    // Optimistically update frontend
    setCartItems((prev) => {
        const newCart = { ...prev };
        if (newCart[itemId] > 0) { // Should always be > 0 if removing
            delete newCart[itemId]; // Removing completely based on UI logic
        }
        return newCart;
    });


    try {
      await axios.post(
        `${serverURL}/api/cart/removefromcart`,
        { itemId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(`Item ${itemId} removed from cart on backend.`);
    } catch (err) {
      console.error("Error removing item from cart:", err);
      // Revert frontend state if backend fails
      setCartItems((prev) => ({ ...prev, [itemId]: currentQuantity })); // Put it back
      setError("Failed to remove item from cart. Please try again.");
       if (err.response?.status === 401) {
             console.log("Unauthorized removing from cart. Token might be invalid.");
             localStorage.removeItem('token');
             // Optionally redirect to login
        }
    }
  };

  // Get total cart amount
  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = all_product.find((product) => product._id === item);
        if (itemInfo) { // Check if itemInfo is found
          totalAmount += itemInfo.price * cartItems[item];
        }
      }
    }
    return totalAmount;
  };

   // Calculate total number of items in cart
    const getTotalCartItems = () => {
        let totalItems = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                totalItems += cartItems[item];
            }
        }
        return totalItems;
    };


  const contextValue = {
    all_product,
    cartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    getTotalCartItems,
    loading, // <-- Add loading to context
    error,   // <-- Add error to context (optional, for displaying errors)
    fetchCart, // <-- Expose fetchCart if needed elsewhere (e.g., after login)
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;