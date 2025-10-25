import uploadOnCloudinary from "../config/cloudinary.js";
import Product from "../model/productModel.js";

// Add new product
export const addProduct = async (req, res) => {
  try {
    console.log("Received request body:", req.body);
    console.log("Received files:", req.files);

    let { name, description, price, category, subCategory, sizes, bestseller } = req.body;

    // Validate required fields
    if (!name || !description || !price || !category || !subCategory || !sizes) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Validate files
    if (!req.files || !req.files.image1 || !req.files.image2 || !req.files.image3 || !req.files.image4) {
      return res.status(400).json({ message: "All 4 images are required" });
    }

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
        console.log("Image URLs:", { image1, image2, image3, image4 });
      } else {
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

    let productData = {
      name: name.trim(),
      description: description.trim(),
      price: Number(price),
      category,
      subCategory,
      sizes: JSON.parse(sizes),
      bestseller: bestseller === "true",
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
    console.log("addProduct error:", error);
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