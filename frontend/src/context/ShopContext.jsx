import React, { createContext, useContext, useEffect, useState } from 'react'
import { authDataContext } from './AuthContext'
import axios from 'axios'
import { userDataContext } from './UserContext'
import { toast } from 'react-toastify'

export const shopDataContext = createContext()

function ShopContext({children}) {
    let [products, setProducts] = useState([])
    let [search, setSearch] = useState('')
    let {userData} = useContext(userDataContext)
    let [showSearch, setShowSearch] = useState(false)
    let {serverURL} = useContext(authDataContext)
    let [cartItem, setCartItem] = useState({});
    let [loading, setLoading] = useState(false)
    let currency = '₹';
    let delivery_fee = 40;

    const getProducts = async () => {
        try {
            let result = await axios.get(serverURL + "/api/product/list")
            console.log("Products fetched:", result.data)
            setProducts(result.data)
        } catch (error) {
            console.log("Error fetching products:", error)
        }
    }

    const addtoCart = async (itemId, size) => {
        if (!size) {
            console.log("Select Product Size");
            toast.error("Please select a size");
            return;
        }

        let cartData = structuredClone(cartItem);

        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            } else {
                cartData[itemId][size] = 1;
            }
        } else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }
      
        setCartItem(cartData);

        if (userData) {
            setLoading(true)
            try {
                let result = await axios.post(serverURL + "/api/cart/add", {itemId, size}, {withCredentials: true})
                console.log("Cart updated:", result.data)
                toast.success("Product Added to Cart")
                setLoading(false)
            } catch (error) {
                console.log("Cart error:", error)
                setLoading(false)
                toast.error("Add Cart Error")
            }
        } else {
            toast.success("Product Added to Cart")
        }
    }

    const getUserCart = async () => {
        if (!userData) return;
        
        try {
            const result = await axios.post(serverURL + '/api/cart/get', {}, { withCredentials: true })
            setCartItem(result.data)
        } catch (error) {
            console.log("Error fetching cart:", error)
        }
    }

    const updateQuantity = async (itemId, size, quantity) => {
        let cartData = structuredClone(cartItem);
        cartData[itemId][size] = quantity
        setCartItem(cartData)

        if (userData) {
            try {
                await axios.post(serverURL + "/api/cart/update", { itemId, size, quantity }, { withCredentials: true })
            } catch (error) {
                console.log("Update cart error:", error)
            }
        }
    }

    const getCartCount = () => {
        let totalCount = 0;
        for (const items in cartItem) {
            for (const item in cartItem[items]) {
                try {
                    if (cartItem[items][item] > 0) {
                        totalCount += cartItem[items][item]
                    }
                } catch (error) {
                    // Handle error silently
                }
            }
        }
        return totalCount
    }

    const getCartAmount = () => {
        let totalAmount = 0;
        for (const items in cartItem) {
            let itemInfo = products.find((product) => product._id === items);
            if (itemInfo) {
                for (const item in cartItem[items]) {
                    try {
                        if (cartItem[items][item] > 0) {
                            totalAmount += itemInfo.price * cartItem[items][item];
                        }
                    } catch (error) {
                        // Handle error silently
                    }
                }
            }
        }
        return totalAmount
    }

    useEffect(() => {
        getProducts()
    }, [])

    useEffect(() => {
        if (userData) {
            getUserCart()
        }
    }, [userData])

    let value = {
        products, 
        currency, 
        delivery_fee,
        getProducts,
        search,
        setSearch,
        showSearch,
        setShowSearch,
        cartItem, 
        addtoCart, 
        getCartCount, 
        setCartItem,
        updateQuantity,
        getCartAmount,
        loading
    }

    return (
        <shopDataContext.Provider value={value}>
            {children}
        </shopDataContext.Provider>
    )
}

export default ShopContext