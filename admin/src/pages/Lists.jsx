import React, { useState, useEffect, useContext } from "react"; // <-- Add useContext
import { authDataContext } from "../context/authContext"; // <-- Import AuthContext
import axios from "axios";
import Loading from '../component/Loading';

function Lists() {
  const { serverURL } = useContext(authDataContext); // <-- Get serverURL from context
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchProducts = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(`${serverURL}/api/product/listproduct`, {
        withCredentials: true,
      });
      console.log("Fetched products:", response.data);
      setProducts(response.data);
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("Failed to fetch products. " + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  const removeProduct = async (id) => {
     // Basic confirmation before deleting
    if (!window.confirm("Are you sure you want to remove this product?")) {
        return;
    }
    try {
        console.log(`Attempting to remove product with ID: ${id}`);
        await axios.delete(`${serverURL}/api/product/removeproduct/${id}`, {
            withCredentials: true,
        });
        console.log(`Product ${id} removed successfully.`);
        // Refetch products to update the list
        fetchProducts();
    } catch (err) {
        console.error("Error removing product:", err);
        setError("Failed to remove product. " + (err.response?.data?.message || err.message));
        // Optionally display this error in a more user-friendly way (e.g., toast notification)
    }
  };


  useEffect(() => {
    fetchProducts();
  }, []); // Empty dependency array ensures this runs only once on mount

  // --- FIX: Image URL construction logic ---
  const getImageUrl = (imagePath) => {
    if (!imagePath) {
      return ""; // Or a placeholder image URL
    }
    if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
      return imagePath;
    } else {
      const imageFullPath = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
      return `${serverURL}${imageFullPath}`;
    }
  };
  // --- END OF FIX ---


  if (loading) {
    return <div className="flex justify-center items-center h-screen"><Loading /></div>;
  }

  if (error) {
    return <div className="text-center text-red-500 mt-10">{error}</div>;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Product List</h1>
      {products.length === 0 ? (
        <p className="text-center text-gray-500">No products found.</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Image
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                 <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sub-Category
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price (₹)
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products.map((product) => (
                <tr key={product._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    {/* Use the getImageUrl function */}
                    <img
                      src={getImageUrl(product.image1)} // Display the first image
                      alt={product.name}
                      className="h-16 w-16 object-cover rounded"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{product.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{product.category}</div>
                  </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{product.subCategory}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{product.price}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => removeProduct(product._id)}
                      className="text-red-600 hover:text-red-900 transition-colors duration-200"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Lists;