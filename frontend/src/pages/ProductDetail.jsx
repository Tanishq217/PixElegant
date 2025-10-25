import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// --- FIX: Import the correct context name ---
import { ShopContext } from '../context/ShopContext'; // Changed from shopDataContext
// --- END OF FIX ---
import { authDataContext } from '../context/AuthContext';
import { FaStar } from "react-icons/fa";
import { FaStarHalfAlt } from "react-icons/fa";
import RelatedProduct from '../components/RelatedProduct';
import Loading from '../components/Loading'; // Import Loading

function ProductDetail() {
    let { id } = useParams();
    // --- FIX: Use the correct context name and get correct values ---
    // Note: 'products' is not exported by ShopContext, 'all_product' is.
    // 'currency' is not exported. 'addtoCart' should likely be 'addToCart'.
    // Make sure ShopContext exports 'addToCart' and 'loading'.
    let { all_product, addToCart, loading: shopLoading, error: shopError } = useContext(ShopContext); // Corrected names
    // --- END OF FIX ---
    let { serverURL } = useContext(authDataContext);
    let [productData, setProductData] = useState(null); // Initialize as null
    let [internalLoading, setInternalLoading] = useState(true); // For finding the product
    let [imageFetchError, setImageFetchError] = useState(false);

    const [image, setImage] = useState('');
    const [image1, setImage1] = useState('');
    const [image2, setImage2] = useState('');
    const [image3, setImage3] = useState('');
    const [image4, setImage4] = useState('');
    const [size, setSize] = useState('');
    const [notification, setNotification] = useState(''); // For add to cart message

    // Find the product data when products load or ID changes
    useEffect(() => {
        setInternalLoading(true); // Start loading state
        setImageFetchError(false); // Reset image error state
        if (all_product && all_product.length > 0 && id) {
            const foundProduct = all_product.find((item) => item._id === id);
            if (foundProduct) {
                console.log("Product found:", foundProduct);
                setProductData(foundProduct);
                // Set images safely, checking if they exist
                setImage1(foundProduct.image1 || '');
                setImage2(foundProduct.image2 || '');
                setImage3(foundProduct.image3 || '');
                setImage4(foundProduct.image4 || '');
                setImage(foundProduct.image1 || ''); // Default to image1
            } else {
                console.log("Product not found with ID:", id);
                setProductData(null); // Explicitly set to null if not found
            }
        } else if (!shopLoading) {
             // If products finished loading but weren't found or empty
             console.log("Products loaded, but product not found or product list empty.");
             setProductData(null);
        }
        setInternalLoading(false); // End loading state after check
    }, [id, all_product, shopLoading]); // Depend on shopLoading as well

    const getImageUrl = (img) => {
        if (!img) return '/placeholder-image.jpg'; // Return placeholder if img is null/undefined/empty
        return img.startsWith('http') ? img : `${serverURL}${img.startsWith('/') ? '' : '/'}${img}`;
    };

     const handleImageError = (e) => {
        console.error("Failed to load image:", e.target.src);
        e.target.src = '/placeholder-image.jpg'; // Fallback placeholder
        setImageFetchError(true); // Set error state
    };

    const handleAddToCart = () => {
        if (!size) {
            setNotification('Please select a size.');
            setTimeout(() => setNotification(''), 3000); // Clear message after 3 seconds
            return;
        }
        if (productData) {
            addToCart(productData._id); // Call addToCart from context
            setNotification(`${productData.name} (Size: ${size}) added to cart!`);
             setTimeout(() => setNotification(''), 3000); // Clear message
        }
    };


    // Combined loading state
    const isLoading = shopLoading || internalLoading;

    if (isLoading) {
         return (
            <div className='w-full min-h-screen bg-white flex items-center justify-center'>
               <Loading />
            </div>
        );
    }

    if (shopError) {
         return (
            <div className='w-full min-h-screen bg-white flex items-center justify-center'>
                 <p className="text-center text-red-500 py-10">Error loading product data: {shopError}</p>
            </div>
         );
    }


    return productData ? (
        <div className='w-full min-h-screen bg-white'>
            <div className='max-w-7xl mx-auto px-4 pt-20 pb-20'>
                 {/* Notification Area */}
                 {notification && (
                    <div className="mb-4 p-3 text-center bg-green-100 text-green-800 rounded border border-green-300">
                        {notification}
                    </div>
                )}
                {imageFetchError && (
                     <div className="mb-4 p-3 text-center bg-yellow-100 text-yellow-800 rounded border border-yellow-300">
                        Warning: Some product images might not be available.
                    </div>
                )}


                <div className='flex flex-col lg:flex-row gap-12'>
                    {/* Image Gallery */}
                    <div className='lg:w-1/2 flex flex-col lg:flex-row gap-6'>
                        {/* Thumbnail Images */}
                        <div className='flex lg:flex-col gap-4 order-2 lg:order-1'>
                            {[image1, image2, image3, image4].map((imgSrc, index) => (
                               imgSrc && ( // Only render if imgSrc is not empty
                                <div key={index} className='w-20 h-20 border border-gray-300 rounded-md overflow-hidden cursor-pointer hover:border-black transition-colors'>
                                    <img
                                        src={getImageUrl(imgSrc)}
                                        alt={`Thumbnail ${index + 1}`}
                                        className='w-full h-full object-cover'
                                        onClick={() => setImage(imgSrc)}
                                        onError={handleImageError} // Use error handler
                                    />
                                </div>
                               )
                            ))}
                        </div>

                        {/* Main Image */}
                        <div className='flex-1 order-1 lg:order-2'>
                            <div className='aspect-square border border-gray-300 rounded-lg overflow-hidden'>
                                <img
                                    src={getImageUrl(image)}
                                    alt={productData.name}
                                    className='w-full h-full object-cover'
                                    onError={handleImageError} // Use error handler
                                />
                            </div>
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className='lg:w-1/2 space-y-6'>
                        <div>
                            <h1 className='text-4xl font-bold text-black mb-4'>{productData.name.toUpperCase()}</h1>
                            <div className='flex items-center gap-2 mb-4'>
                                {/* Static stars for now */}
                                <FaStar className='text-yellow-400' />
                                <FaStar className='text-yellow-400' />
                                <FaStar className='text-yellow-400' />
                                <FaStar className='text-yellow-400' />
                                <FaStarHalfAlt className='text-yellow-400' />
                                <span className='text-gray-600 ml-2'>(124 reviews)</span>
                            </div>
                            <p className='text-3xl font-bold text-black mb-6'>₹ {productData.price}</p> {/* Assuming price is number */}
                            <p className='text-lg text-gray-700 mb-6'>{productData.description}</p>
                        </div>

                        {/* Size Selection */}
                        <div className='space-y-4'>
                            <h3 className='text-xl font-semibold text-black'>Select Size</h3>
                            <div className='flex flex-wrap gap-3'> {/* Added flex-wrap */}
                                {productData.sizes && productData.sizes.length > 0 ? (
                                    productData.sizes.map((item, index) => (
                                        <button
                                            key={index}
                                            className={`border border-gray-300 py-2 px-4 rounded-md transition-colors ${
                                                item === size
                                                    ? 'bg-black text-white border-black'
                                                    : 'bg-white text-black hover:border-black'
                                            }`}
                                            onClick={() => setSize(item)}
                                        >
                                            {item}
                                        </button>
                                    ))
                                ) : (
                                    <p className="text-gray-500">No sizes available</p>
                                )}
                            </div>
                            <button
                                className='w-full bg-black text-white py-3 px-6 rounded-lg hover:bg-gray-800 transition-colors font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2'
                                onClick={handleAddToCart}
                                disabled={!size || shopLoading || !productData.sizes || productData.sizes.length === 0} // Disable if no size, loading, or no sizes available
                            >
                                {shopLoading ? <Loading/> : "Add to Cart"}
                            </button>
                        </div>

                        {/* Product Features */}
                        <div className='border-t border-gray-300 pt-6'>
                            <div className='space-y-2 text-gray-700'>
                                <p>✓ 100% Original Product</p>
                                <p>✓ Cash on delivery available</p>
                                <p>✓ Easy return and exchange policy within 7 days</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Product Description */}
                <div className='mt-20'>
                    <div className='flex gap-4 mb-6'>
                        <button className='border border-gray-300 px-6 py-3 text-black hover:bg-gray-50 transition-colors rounded'>
                            Description
                        </button>
                        <button className='border border-gray-300 px-6 py-3 text-black hover:bg-gray-50 transition-colors rounded'>
                            Reviews (124)
                        </button>
                    </div>
                    <div className='bg-gray-50 border border-gray-300 p-8 rounded-lg'>
                        <p className='text-gray-700 leading-relaxed'>
                           {productData.description || "No description available."} {/* Display actual description */}
                        </p>
                         <p className='text-gray-700 leading-relaxed mt-4'>
                            Upgrade your wardrobe with this stylish piece, available now on PixElegant.
                            Crafted from breathable, high-quality fabric, it offers all-day comfort and effortless style.
                            Easy to maintain and perfect for any setting, this item is a must-have essential for those
                            who value both fashion and function.
                        </p>
                    </div>
                </div>

                {/* Related Products - Ensure props are passed correctly */}
                 {productData.category && productData.subCategory && (
                   <div className='mt-20'>
                       <RelatedProduct
                           category={productData.category}
                           subCategory={productData.subCategory}
                           currentProductId={productData._id}
                       />
                   </div>
                 )}
            </div>
        </div>
    ) : ( // Product not found state
        <div className='w-full min-h-screen bg-white flex items-center justify-center'>
            <div className='text-center'>
                <h2 className='text-2xl font-bold text-black mb-4'>Product Not Found</h2>
                <p className='text-gray-600'>The product you're looking for might have been removed or doesn't exist.</p>
                <Link to="/" className="text-blue-600 hover:underline mt-4 inline-block">Go back to Home</Link>
            </div>
        </div>
    );
}

export default ProductDetail;