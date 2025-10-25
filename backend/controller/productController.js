import uploadOnCloudinary from "../config/cloudinary.js";
import Product from "../model/productModel.js";

// Add new product
export const addProduct = async (req, res) => {
  try {
    console.log("Received request body:", req.body);
    console.log("Received files:", req.files);

    let { name, description, price, category, subCategory, sizes, bestseller } = req.body;

    // Validate required fields
    if (!name || !description || !price || !category || !subCategory) {
      return res.status(400).json({ message: "All text fields are required" });
    }

    // Validate files
    if (!req.files || !req.files.image1 || !req.files.image2 || !req.files.image3 || !req.files.image4) {
      return res.status(400).json({ message: "All 4 images are required" });
    }

    // --- FIX: Safely parse 'sizes' ---
    let parsedSizes;
    try {
        // Ensure 'sizes' is a string and not empty before parsing
        if (typeof sizes === 'string' && sizes.trim() !== '') {
            parsedSizes = JSON.parse(sizes);
        } else if (Array.isArray(sizes)) {
            parsedSizes = sizes; // Already an array, unlikely but safe
        } else {
            parsedSizes = []; // Default to empty array
        }
    } catch (parseError) {
        console.log("Error parsing sizes:", parseError.message, "Received:", sizes);
        return res.status(400).json({ message: "Invalid format for sizes. Expected a JSON array string." });
    }
    
    // Frontend validation should catch this, but double-check on backend
    if (parsedSizes.length === 0) {
        return res.status(400).json({ message: "Please select at least one size" });
    }
    // --- END OF FIX ---


    // Try Cloudinary upload first
    let image1, image2, image3, image4;
    
    try {
      console.log("Attempting Cloudinary upload...");
      image1 = await uploadOnCloudinary(req.files.image1[0].path);
      image2 = await uploadOnCloudinary(req.files.image2[0].path);
      image3 = await uploadOnCloudinary(req.files.image3[0].path);
      image4 = await uploadOnCloudinary(req.files.image4[0].path);
      
      if (image1 && image2 && image3 && image4) {
        console.log("✅ Cloudinary upload successful");
      } else {
        // This 'else' will be hit if any upload returns null/undefined
        throw new Error("One or more images failed to upload to Cloudinary");
      }
    } catch (cloudinaryError) {
      console.log("⚠️ Cloudinary upload failed:", cloudinaryError.message);
      console.log("Using local file paths as fallback");
      
      // Fallback to local storage
      image1 = `/uploads/${req.files.image1[0].filename}`;
      image2 = `/uploads/${req.files.image2[0].filename}`;
      image3 = `/uploads/${req.files.image3[0].filename}`;
      image4 = `/uploads/${req.files.image4[0].filename}`;
    }

    // --- FIX: Safer boolean conversion for 'bestseller' ---
    // FormData sends booleans as strings "true" or "false"
    const isBestseller = bestseller === "true" || bestseller === true;
    // --- END OF FIX ---

    let productData = {
      name: name.trim(),
      description: description.trim(),
      price: Number(price),
      category,
      subCategory,
      sizes: parsedSizes, // Use the safely parsed array
      bestseller: isBestseller, // Use the safer boolean
      date: Date.now(),
      image1,
      image2,
      image3,
      image4
    };

    console.log("Creating product with data:", productData);

    const product = await Product.create(productData);

    console.log("Product created successfully:", product);

    return res.status(201).json(product);

  } catch (error) {
    // This is the outer catch block that sends the 500 error
    console.log("addProduct error (uncaught):", error);
    return res.status(500).json({ message: `AddProduct error: ${error.message}` });
  }
};

// List all products
export const listProduct = async (req, res) => {
  try {
    const product = await Product.find({});
    return res.status(200).json(product);
  } catch (error) {
    console.log("listProduct error:", error);
    return res.status(500).json({ message: `ListProduct error ${error}` });
  }
};

// Remove a product
export const removeProduct = async (req, res) => {
  try {
    let { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    return res.status(200).json(product);
  } catch (error) {
    console.log("removeProduct error:", error);
    return res.status(500).json({ message: `RemoveProduct error ${error}` });
  }
};