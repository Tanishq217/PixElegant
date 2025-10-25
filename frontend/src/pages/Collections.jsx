import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FaChevronDown } from "react-icons/fa";
import Title from '../components/Title';
// --- FIX: Import the correct context name ---
import { ShopContext } from '../context/ShopContext'; // Correct name
// --- END OF FIX ---
import Card from '../components/Card';
import Loading from '../components/Loading'; // Import Loading component

function Collections() {
  const { categoryName } = useParams(); // Get category name from URL
  // --- FIX: Use the correct context name ---
  const { all_product, loading, error } = useContext(ShopContext); // Correct name
  // --- END OF FIX ---
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortOption, setSortOption] = useState('newest'); // Default sort

  useEffect(() => {
    if (all_product && all_product.length > 0) {
      // Filter products by category
      let productsInCategory = all_product.filter(
        (product) => product.category.toLowerCase() === categoryName.toLowerCase()
      );

      // Sort products based on sortOption
      if (sortOption === 'newest') {
        productsInCategory.sort((a, b) => new Date(b.date) - new Date(a.date));
      } else if (sortOption === 'priceLowHigh') {
        productsInCategory.sort((a, b) => a.price - b.price);
      } else if (sortOption === 'priceHighLow') {
        productsInCategory.sort((a, b) => b.price - a.price);
      }

      setFilteredProducts(productsInCategory);
    }
  }, [all_product, categoryName, sortOption]); // Re-run when products, category, or sort changes

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  // Capitalize category name for display
  const displayCategoryName = categoryName.charAt(0).toUpperCase() + categoryName.slice(1);

  return (
    <div className="py-12 px-4 md:px-10 bg-gray-50 min-h-screen">
      <Title title={`${displayCategoryName}'s Collection`} />

      {/* Sort Dropdown */}
      <div className="flex justify-end mb-8">
        <div className="relative">
          <select
            value={sortOption}
            onChange={handleSortChange}
            className="appearance-none block w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          >
            <option value="newest">Sort by Newest</option>
            <option value="priceLowHigh">Price: Low to High</option>
            <option value="priceHighLow">Price: High to Low</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <FaChevronDown size={16} />
          </div>
        </div>
      </div>

      {loading && (
        <div className="flex justify-center items-center py-10">
          <Loading />
        </div>
      )}

      {error && (
        <p className="text-center text-red-500 py-10">{error}</p>
      )}

      {!loading && !error && filteredProducts.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 mt-8">
          {filteredProducts.map((product) => (
            <Card key={product._id} product={product} />
          ))}
        </div>
      )}

       {!loading && !error && filteredProducts.length === 0 && (
         <p className="text-center text-gray-500 py-10">No products found in this collection.</p>
       )}
    </div>
  );
}

export default Collections;