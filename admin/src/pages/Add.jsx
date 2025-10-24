import React, { useContext, useState } from 'react'
import Nav from '../component/Nav'
import Sidebar from '../component/Sidebar'
import upload from '../assets/plus.png'
import { authDataContext } from '../context/authContext'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Loading from '../component/Loading'


// here user should add 4 images for a product , name disc ,size , prioice etc !!! 

// the product should get added and console the detail of product and also in our mongoose it should display the product detail in different section "products" not in "users" !!!! thsi is what needs to be done for now 

function Add() {
  let [image1,setImage1] = useState(false)
  let [image2,setImage2] = useState(false)
  let [image3,setImage3] = useState(false)
  let [image4,setImage4] = useState(false)
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("Men")
  const [price, setPrice] = useState("")
  const [subCategory, setSubCategory] = useState("TopWear")
  const [bestseller, setBestSeller] = useState(false)
  const [sizes,setSizes] = useState([])
  const [loading,setLoading] = useState(false)
  let {serverURL} = useContext(authDataContext)

  const handleAddProduct = async (e) => {
    e.preventDefault()
    
    // Validate required fields
    if (!name.trim()) {
      toast.error("Please enter product name")
      return
    }
    if (!description.trim()) {
      toast.error("Please enter product description")
      return
    }
    if (!price || price <= 0) {
      toast.error("Please enter a valid price")
      return
    }
    if (!image1 || !image2 || !image3 || !image4) {
      toast.error("Please upload all 4 images")
      return
    }
    if (sizes.length === 0) {
      toast.error("Please select at least one size")
      return
    }

    setLoading(true)
    try {
      let formData = new FormData()
      formData.append("name", name.trim())
      formData.append("description", description.trim())
      formData.append("price", price)
      formData.append("category", category)
      formData.append("subCategory", subCategory)
      formData.append("bestseller", bestseller)
      formData.append("sizes", JSON.stringify(sizes))
      formData.append("image1", image1)
      formData.append("image2", image2)
      formData.append("image3", image3)
      formData.append("image4", image4)

      console.log("Submitting product data:", {
        name: name.trim(),
        description: description.trim(),
        price: price,
        category,
        subCategory,
        bestseller,
        sizes,
        imagesCount: [image1, image2, image3, image4].filter(img => img).length
      })

      let result = await axios.post(serverURL + "/api/product/addproduct", formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      console.log("Product created successfully:", result.data)
      toast.success("Product Added Successfully!")
      
      // Reset form
      setName("")
      setDescription("")
      setImage1(false)
      setImage2(false)
      setImage3(false)
      setImage4(false)
      setPrice("")
      setBestSeller(false)
      setCategory("Men")
      setSubCategory("TopWear")
      setSizes([])
      
    } catch (error) {
      console.error("Add Product Error:", error)
      if (error.response?.data?.message) {
        toast.error(error.response.data.message)
      } else {
        toast.error("Failed to add product. Please try again.")
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='w-[100vw] min-h-[100vh] bg-gray-900 text-white overflow-x-hidden relative'>
      <Nav/>
      <Sidebar/>

      <div className='w-[82%] min-h-[100vh] absolute right-0 top-0 flex flex-col items-center py-[100px] px-[40px] gap-[40px]'>
        <h1 className='text-4xl md:text-5xl font-bold text-white shadow-md p-4 rounded-lg bg-gray-800/80 w-full text-center'>Add Product</h1>

        <form onSubmit={handleAddProduct} className='w-full flex flex-col gap-8'>

          {/* Upload Images */}
          <div className='flex flex-col gap-3'>
            <p className='text-xl font-semibold'>Upload Images</p>
            <div className='flex gap-4 flex-wrap'>
              {[image1,image2,image3,image4].map((img,index)=>(
                <label key={index} htmlFor={`image${index+1}`} className='w-[80px] h-[80px] md:w-[100px] md:h-[100px] cursor-pointer bg-gray-800 rounded-lg flex items-center justify-center shadow-lg hover:scale-105 transition'>
                  <img src={!img ? upload : URL.createObjectURL(img)} alt="" className='w-[80%] h-[80%] object-cover rounded-md'/>
                  <input 
                    type="file" 
                    id={`image${index+1}`} 
                    name={`image${index+1}`}
                    accept="image/*"
                    hidden 
                    onChange={(e)=>{
                      if(index===0)setImage1(e.target.files[0])
                      if(index===1)setImage2(e.target.files[0])
                      if(index===2)setImage3(e.target.files[0])
                      if(index===3)setImage4(e.target.files[0])
                    }} 
                  />
                </label>
              ))}
            </div>
          </div>

          {/* Product Name */}
          <div className='flex flex-col gap-2'>
            <p className='text-xl font-semibold'>Product Name</p>
            <input type="text" placeholder='Type here'
              className='w-full max-w-lg h-12 px-4 rounded-lg bg-gray-800 border border-gray-700 placeholder-gray-400 text-white focus:ring-2 focus:ring-white'
              onChange={(e)=>setName(e.target.value)} value={name} required
            />
          </div>

          {/* Product Description */}
          <div className='flex flex-col gap-2'>
            <p className='text-xl font-semibold'>Product Description</p>
            <textarea placeholder='Type here'
              className='w-full max-w-lg h-28 px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 placeholder-gray-400 text-white focus:ring-2 focus:ring-white resize-none'
              onChange={(e)=>setDescription(e.target.value)} value={description} required
            />
          </div>

          {/* Category & Sub-Category */}
          <div className='flex flex-wrap gap-6'>
            <div className='flex flex-col gap-2'>
              <p className='text-xl font-semibold'>Category</p>
              <select className='bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700' onChange={(e)=>setCategory(e.target.value)}>
                <option value="Men">Men</option>
                <option value="Women">Women</option>
                <option value="Kids">Kids</option>
              </select>
            </div>
            <div className='flex flex-col gap-2'>
              <p className='text-xl font-semibold'>Sub-Category</p>
              <select className='bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700' onChange={(e)=>setSubCategory(e.target.value)}>
                <option value="TopWear">TopWear</option>
                <option value="BottomWear">BottomWear</option>
                <option value="WinterWear">WinterWear</option>
              </select>
            </div>
          </div>

          {/* Price */}
          <div className='flex flex-col gap-2'>
            <p className='text-xl font-semibold'>Product Price</p>
            <input type="number" placeholder='₹ 2000'
              className='w-full max-w-lg h-12 px-4 rounded-lg bg-gray-800 border border-gray-700 text-white focus:ring-2 focus:ring-white'
              onChange={(e)=>setPrice(e.target.value)} value={price} required
            />
          </div>

          {/* Sizes */}
          <div className='flex flex-col gap-2'>
            <p className='text-xl font-semibold'>Product Size</p>
            <div className='flex flex-wrap gap-4'>
              {["S","M","L","XL","XXL"].map(size=>(
                <div key={size} className={`px-4 py-2 rounded-lg border border-gray-700 cursor-pointer text-white hover:bg-white hover:text-black transition ${sizes.includes(size) ? "bg-white text-black border-gray-400" : "bg-gray-800"}`} onClick={()=>setSizes(prev => prev.includes(size) ? prev.filter(item=>item!==size) : [...prev,size])}>{size}</div>
              ))}
            </div>
          </div>

          {/* Bestseller */}
          <div className='flex items-center gap-3'>
            <input type="checkbox" id='checkbox' className='w-6 h-6 cursor-pointer' onChange={()=>setBestSeller(prev=>!prev)}/>
            <label htmlFor='checkbox' className='text-lg font-semibold'>Add to Bestseller</label>
          </div>

          {/* Submit Button */}
          <button type="submit" className='w-48 py-3 rounded-xl bg-white text-black font-semibold hover:bg-gray-200 transition flex items-center justify-center'>
            {loading ? <Loading/> : "Add Product"}
          </button>

        </form>
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
        theme="dark"
      />
    </div>
  )
}

export default Add
