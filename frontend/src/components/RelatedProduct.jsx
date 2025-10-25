import React, { useContext, useEffect, useState } from 'react';
// --- FIX: Import the correct context name ---
import { ShopContext } from '../context/ShopContext'; // Changed from shopDataContext
// --- END OF FIX ---
import Title from './Title';
import Card from './Card';
import Loading from './Loading'; // Import Loading

function RelatedProduct({ category, subCategory, currentProductId }) {
    // --- FIX: Use the correct context name and data ---
    // Note: ShopContext exports 'all_product', not 'products'
    let { all_product, loading, error } = useContext(ShopContext); // Changed from shopDataContext and products
    // --- END OF FIX ---
    let [related, setRelated] = useState([]);

    useEffect(() => {
        if (all_product && all_product.length > 0 && category && subCategory && currentProductId) {
            let productsCopy = all_product
                .filter((item) => item.category === category) // Direct comparison
                .filter((item) => item.subCategory === subCategory) // Direct comparison
                .filter((item) => item._id !== currentProductId); // Filter out the current product
            setRelated(productsCopy.slice(0, 4)); // Get up to 4 related products
        } else {
            setRelated([]); // Clear related products if conditions aren't met
        }
    }, [all_product, category, subCategory, currentProductId]); // Dependencies

    return (
        <div className='py-12 px-4 md:px-10'> {/* Adjusted padding */}
            <Title title="Related Products" /> {/* Simplified title */}

             {loading && (
                <div className="flex justify-center items-center py-10">
                    <Loading />
                </div>
             )}

             {error && (
                <p className="text-center text-red-500 py-10">Could not load related products.</p>
             )}

            {!loading && !error && related.length > 0 && (
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mt-8 max-w-7xl mx-auto'>
                    {related.map((item) => (
                         // Ensure Card component receives the whole product object
                        <Card key={item._id} product={item} />
                    ))}
                </div>
            )}

             {!loading && !error && related.length === 0 && (
                 <p className="text-center text-gray-500 py-10">No related products found.</p>
             )}
        </div>
    );
}

export default RelatedProduct;