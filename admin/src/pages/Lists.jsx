import React, { useContext, useState, useEffect } from 'react'
import Nav from '../component/Nav'
import Sidebar from '../component/Sidebar'
import { authDataContext } from '../context/authContext'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function Lists() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const { serverURL } = useContext(authDataContext)

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const result = await axios.get(serverURL + "/api/product/list")
      setProducts(result.data)
      console.log("Products fetched:", result.data)
    } catch (error) {
      console.error("Error fetching products:", error)
      toast.error("Failed to fetch products")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const handleDeleteProduct = async (productId) => {
    try {
      await axios.post(`${serverURL}/api/product/remove/${productId}`, {}, { withCredentials: true })
      toast.success("Product deleted successfully")
      fetchProducts() // Refresh the list
    } catch (error) {
      console.error("Error deleting product:", error)
      toast.error("Failed to delete product")
    }
  }

  return (
    <div className='w-[100vw] min-h-[100vh] bg-white text-black overflow-x-hidden relative'>
      <Nav/>
      <Sidebar/>
      
      <div className='w-[82%] min-h-[100vh] absolute right-0 top-0 flex flex-col items-center py-[100px] px-[40px] gap-[40px]'>
        <h1 className='text-4xl md:text-5xl font-bold text-black shadow-md p-4 rounded-lg bg-gray-100 w-full text-center border border-gray-300'>
          PixElegant Products
        </h1>

        {loading ? (
          <div className='flex items-center justify-center h-64'>
            <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-black'></div>
          </div>
        ) : (
          <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {products.length === 0 ? (
              <div className='col-span-full text-center py-12'>
                <p className='text-xl text-gray-500'>No products found</p>
              </div>
            ) : (
              products.map((product) => (
                <div key={product._id} className='bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition border border-gray-200'>
                  <div className='h-48 bg-gray-100 flex items-center justify-center'>
                    <img 
                      src={product.image1?.startsWith('http') ? product.image1 : `${serverURL}${product.image1}`}
                      alt={product.name}
                      className='w-full h-full object-cover'
                      onError={(e) => {
                        e.target.src = '/placeholder-image.jpg';
                        e.target.alt = 'Image not available';
                      }}
                    />
                  </div>
                  <div className='p-4'>
                    <h3 className='text-xl font-semibold mb-2 text-black'>{product.name}</h3>
                    <p className='text-gray-600 text-sm mb-2 line-clamp-2'>{product.description}</p>
                    <div className='flex justify-between items-center mb-3'>
                      <span className='text-lg font-bold text-black'>₹{product.price}</span>
                      <span className='text-sm text-gray-500'>{product.category}</span>
                    </div>
                    <div className='flex flex-wrap gap-1 mb-3'>
                      {product.sizes.map((size, index) => (
                        <span key={index} className='px-2 py-1 bg-gray-100 rounded text-xs border border-gray-300'>
                          {size}
                        </span>
                      ))}
                    </div>
                    <div className='flex justify-end'>
                      <button 
                        onClick={() => handleDeleteProduct(product._id)}
                        className='bg-red-600 hover:bg-red-700 text-white p-2 rounded-full transition-all duration-200 hover:scale-110 shadow-lg'
                        title="Delete Product"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
      
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  )
}

export default Lists