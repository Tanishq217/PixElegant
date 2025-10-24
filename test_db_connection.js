// Test script to verify the add product functionality
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const testConnection = async () => {
  try {
    const mongoUri = process.env.MONGODB_URL;
    await mongoose.connect(mongoUri);
    console.log("✅ Database connected successfully");
    
    // Test if we can access the Product collection
    const Product = mongoose.model("Product", new mongoose.Schema({
      name: String,
      image1: String,
      image2: String,
      image3: String,
      image4: String,
      description: String,
      price: Number,
      category: String,
      subCategory: String,
      sizes: Array,
      date: Number,
      bestseller: Boolean
    }, {timestamps: true}));
    
    const count = await Product.countDocuments();
    console.log(`✅ Product collection accessible. Current products: ${count}`);
    
    await mongoose.disconnect();
    console.log("✅ Database disconnected successfully");
  } catch (error) {
    console.error("❌ Database connection failed:", error.message);
  }
};

testConnection();
