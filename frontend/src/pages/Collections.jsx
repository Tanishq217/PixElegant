import React, { useContext, useEffect, useState } from 'react'
import { FaChevronRight } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";
import Title from '../components/Title';
import { shopDataContext } from '../context/ShopContext';
import Card from '../components/Card';

function Collections() {
    let [showFilter, setShowFilter] = useState(false)
    let {products, search, showSearch} = useContext(shopDataContext)
    let [filterProduct, setFilterProduct] = useState([])
    let [category, setCategory] = useState([])
    let [subCategory, setSubCategory] = useState([])
    let [sortType, setSortType] = useState("relevant")

    const toggleCategory = (e) => {
        if(category.includes(e.target.value)){
            setCategory(prev => prev.filter(item => item !== e.target.value))
        } else {
            setCategory(prev => [...prev, e.target.value])
        }
    }

    const toggleSubCategory = (e) => {
        if(subCategory.includes(e.target.value)){
            setSubCategory(prev => prev.filter(item => item !== e.target.value))
        } else {
            setSubCategory(prev => [...prev, e.target.value])
        }
    }

    const applyFilter = () => {
        let productCopy = products.slice()

        if(showSearch && search){
            productCopy = productCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
        }
        if(category.length > 0) {
            productCopy = productCopy.filter(item => category.includes(item.category))
        }
        if(subCategory.length > 0) {
            productCopy = productCopy.filter(item => subCategory.includes(item.subCategory))
        }
        setFilterProduct(productCopy)
    }

    const sortProducts = (e) => {
        let fbCopy = filterProduct.slice()

        switch(sortType){
            case 'low-high':
                setFilterProduct(fbCopy.sort((a,b) => (a.price - b.price)))
                break;
            case 'high-low':
                setFilterProduct(fbCopy.sort((a,b) => (b.price - a.price)))
                break;
            default:
                applyFilter()
                break;
        }
    }

    useEffect(() => {
        sortProducts()
    }, [sortType])

    useEffect(() => {
        setFilterProduct(products)
    }, [products])

    useEffect(() => {
        applyFilter()
    }, [category, subCategory, search, showSearch])

  return (
    <div className='w-full min-h-screen bg-white pt-20 pb-20'>
      <div className='max-w-7xl mx-auto px-4'>
        <div className='flex flex-col lg:flex-row gap-8'>
          {/* Filter Sidebar */}
          <div className={`lg:w-80 w-full ${showFilter ? "h-auto" : "h-auto"} p-6 border border-gray-200 bg-gray-50 rounded-lg lg:sticky lg:top-24`}>
            <p className='text-2xl font-semibold flex gap-2 items-center justify-start cursor-pointer text-black mb-6' onClick={() => setShowFilter(prev => !prev)}>
              FILTERS
              {!showFilter && <FaChevronRight className='text-lg lg:hidden' />}
              {showFilter && <FaChevronDown className='text-lg lg:hidden' />}
            </p>
            
            <div className={`border border-gray-300 p-4 mt-4 rounded-md bg-white ${showFilter ? "" : "hidden"} lg:block`}>
              <p className='text-lg text-black font-semibold mb-3'>CATEGORIES</p>
              <div className='space-y-2'>
                <label className='flex items-center gap-2 text-black cursor-pointer'>
                  <input type="checkbox" value={'Men'} className='w-4 h-4' onChange={toggleCategory} />
                  Men
                </label>
                <label className='flex items-center gap-2 text-black cursor-pointer'>
                  <input type="checkbox" value={'Women'} className='w-4 h-4' onChange={toggleCategory} />
                  Women
                </label>
                <label className='flex items-center gap-2 text-black cursor-pointer'>
                  <input type="checkbox" value={'Kids'} className='w-4 h-4' onChange={toggleCategory} />
                  Kids
                </label>
              </div>
            </div>
            
            <div className={`border border-gray-300 p-4 mt-4 rounded-md bg-white ${showFilter ? "" : "hidden"} lg:block`}>
              <p className='text-lg text-black font-semibold mb-3'>SUB-CATEGORIES</p>
              <div className='space-y-2'>
                <label className='flex items-center gap-2 text-black cursor-pointer'>
                  <input type="checkbox" value={'TopWear'} className='w-4 h-4' onChange={toggleSubCategory} />
                  TopWear
                </label>
                <label className='flex items-center gap-2 text-black cursor-pointer'>
                  <input type="checkbox" value={'BottomWear'} className='w-4 h-4' onChange={toggleSubCategory} />
                  BottomWear
                </label>
                <label className='flex items-center gap-2 text-black cursor-pointer'>
                  <input type="checkbox" value={'WinterWear'} className='w-4 h-4' onChange={toggleSubCategory} />
                  WinterWear
                </label>
              </div>
            </div>
          </div>
          
          {/* Products Section */}
          <div className='flex-1'>
            <div className='flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8'>
              <Title text1={"ALL"} text2={"COLLECTIONS"}/>
              <select 
                className='bg-white border border-gray-300 w-full lg:w-48 h-12 px-4 text-black rounded-lg focus:border-black focus:outline-none' 
                onChange={(e) => setSortType(e.target.value)}
                value={sortType}
              >
                <option value="relevant">Sort By: Relevant</option>
                <option value="low-high">Sort By: Low to High</option>
                <option value="high-low">Sort By: High to Low</option>
              </select>
            </div>
            
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
              {
                filterProduct.map((item, index) => (
                  <Card key={index} id={item._id} name={item.name} price={item.price} image={item.image1}/>
                ))
              }
            </div>
            
            {filterProduct.length === 0 && (
              <div className='text-center py-12'>
                <p className='text-gray-500 text-lg'>No products found matching your criteria.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Collections