import React, { useContext, useEffect, useState } from 'react';
import Title from './Title';
// --- FIX: Import the correct context name ---
import { ShopContext } from '../context/ShopContext'; // Changed from shopDataContext
// --- END OF FIX ---
import Card from './Card';
import Loading from './Loading'; // Import Loading component

function LatestCollection() {
  // --- FIX: Use the correct context name ---
  const { all_product, loading, error } = useContext(ShopContext); // Changed from shopDataContext
  // --- END OF FIX ---

  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    if (all_product && all_product.length > 0) {
      // Sort products by date (newest first) and take the latest 8
      const sortedProducts = [...all_product].sort((a, b) => new Date(b.date) - new Date(a.date));
      setLatestProducts(sortedProducts.slice(0, 8));
    }
  }, [all_product]); // Re-run when all_product changes

  return (
    <div className="py-12 px-4 md:px-10 bg-gradient-to-b from-gray-50 to-white">
      <Title title="Latest Collection" />

      {loading && (
        <div className="flex justify-center items-center py-10">
          <Loading />
        </div>
      )}

      {error && (
        <p className="text-center text-red-500 py-10">{error}</p>
      )}

      {!loading && !error && latestProducts.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 mt-8">
          {latestProducts.map((product) => (
            <Card key={product._id} product={product} />
          ))}
        </div>
      )}

       {!loading && !error && latestProducts.length === 0 && (
         <p className="text-center text-gray-500 py-10">No products found in the latest collection.</p>
       )}
    </div>
  );
}

export default LatestCollection;