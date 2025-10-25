import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext"; // Import AuthContext to get serverURL

function Card({ product }) {
  const { serverURL } = useContext(AuthContext); // Get the backend server URL

  // --- FIX: Construct the correct image source URL ---
  const getImageUrl = (imagePath) => {
    if (!imagePath) {
      return ""; // Handle cases where imagePath might be missing
    }
    // Check if it's a full URL (like Cloudinary's) or a relative path
    if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
      return imagePath; // It's already a full URL
    } else {
      // It's a relative path (like /uploads/...), prepend the server URL
      // Ensure no double slashes if imagePath already starts with /
      const imageFullPath = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
      return `${serverURL}${imageFullPath}`;
    }
  };
  // --- END OF FIX ---

  return (
    <Link
      to={`/product/${product._id}`} // Link to product detail page
      className="card border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out bg-white flex flex-col h-full"
    >
      <div className="relative w-full aspect-square overflow-hidden">
        {/* Use the getImageUrl function */}
        <img
          src={getImageUrl(product.image1)} // Use image1 as the primary card image
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-105"
        />
        {/* Optional: Add a badge for bestseller */}
        {product.bestseller && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
            Bestseller
          </span>
        )}
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold mb-1 truncate text-gray-800">{product.name}</h3>
        <p className="text-sm text-gray-500 mb-2 capitalize">{product.subCategory}</p>
        <p className="text-xl font-bold text-gray-900 mt-auto">₹ {product.price}</p>
      </div>
    </Link>
  );
}

export default Card;