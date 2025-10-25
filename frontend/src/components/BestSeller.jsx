import React, { useContext, useEffect, useState } from 'react';
import Title from './Title';
// --- FIX: Import the correct context name ---
import { ShopContext } from '../context/ShopContext';// Changed from shopDataContext
// --- END OF FIX ---
import Card from './Card';
import Loading from './Loading'; // Import Loading component

function BestSeller() {
  // --- FIX: Use the correct context name ---
  const { all_product, loading, error } = useContext(ShopContext);// Changed from shopDataContext
  // --- END OF FIX ---

  const [bestSellerProducts, setBestSellerProducts] = useState([]);

  useEffect(() => {
    if (all_product && all_product.length > 0) {
      // Filter products marked as bestseller and take up to 4
      const filteredProducts = all_product.filter(product => product.bestseller);
      setBestSellerProducts(filteredProducts.slice(0, 4));
    }
  }, [all_product]); // Re-run when all_product changes

  return (
    <div className="py-12 px-4 md:px-10 bg-white">
      <Title title="Best Sellers" />

      {loading && (
        <div className="flex justify-center items-center py-10">
          <Loading />
        </div>
      )}

      {error && (
        <p className="text-center text-red-500 py-10">{error}</p>
      )}

      {!loading && !error && bestSellerProducts.length > 0 && (
         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 mt-8">
           {bestSellerProducts.map((product) => (
             <Card key={product._id} product={product} />
           ))}
         </div>
      )}

      {!loading && !error && bestSellerProducts.length === 0 && (
         <p className="text-center text-gray-500 py-10">No best-selling products found at the moment.</p>
       )}
    </div>
  );
}

export default BestSeller;