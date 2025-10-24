# PixElegant - E-Commerce Platform

![PixElegant Logo](https://img.shields.io/badge/PixElegant-E--Commerce-blue)
![React](https://img.shields.io/badge/React-19.1.1-blue)
![Node.js](https://img.shields.io/badge/Node.js-Express-green)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-blue)

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)
- [API Documentation](#api-documentation)
- [Deployment](#deployment)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)

## 🎯 Project Overview

**PixElegant** is a full-stack e-commerce platform built with modern web technologies. It provides a complete shopping experience with user authentication, product management, shopping cart functionality, and order processing. The platform features a clean black and white design theme with professional UI/UX.

### What is PixElegant?

PixElegant is a comprehensive e-commerce solution that allows users to:
- Browse and purchase fashion products
- Manage their shopping cart
- Place orders with cash on delivery
- Track their order history
- Experience seamless authentication with Google OAuth

For administrators, it provides:
- Complete product management system
- Order tracking and management
- User management capabilities
- Analytics and reporting features

## ✨ Features

### 🛍️ Customer Features

#### **Authentication & User Management**
- **User Registration & Login**: Email/password authentication
- **Google OAuth Integration**: One-click login with Google
- **Secure Session Management**: JWT-based authentication
- **User Profile Management**: Personal information and preferences

#### **Product Browsing & Discovery**
- **Product Catalog**: Browse all available products
- **Product Categories**: Filter by Men/Women categories
- **Sub-categories**: TopWear, BottomWear, etc.
- **Product Search**: Find products quickly
- **Product Sorting**: Sort by price (low-high, high-low)
- **Best Sellers**: Featured products section
- **Latest Collections**: New arrivals showcase

#### **Product Details**
- **Image Gallery**: 4 high-quality product images
- **Detailed Descriptions**: Comprehensive product information
- **Size Selection**: Multiple size options (S, M, L, XL, XXL)
- **Price Display**: Clear pricing with currency symbol
- **Related Products**: Similar product recommendations
- **Product Reviews**: Customer feedback system

#### **Shopping Cart & Checkout**
- **Add to Cart**: Easy product addition with size selection
- **Cart Management**: Update quantities, remove items
- **Cart Persistence**: Cart saved across sessions
- **Price Calculation**: Automatic total calculation with shipping
- **Checkout Process**: Streamlined order placement
- **Cash on Delivery**: Secure payment method
- **Order Confirmation**: Email confirmations and tracking

#### **Order Management**
- **Order History**: View all past orders
- **Order Tracking**: Real-time order status updates
- **Order Details**: Complete order information
- **Return/Exchange**: Easy return process

### 🔧 Admin Features

#### **Product Management**
- **Add Products**: Upload products with 4 images
- **Product Listing**: View all products in admin panel
- **Product Editing**: Update product information
- **Product Deletion**: Remove products with confirmation
- **Image Management**: Cloudinary integration with local fallback
- **Category Management**: Organize products by categories

#### **Order Management**
- **Order Dashboard**: View all customer orders
- **Order Status Updates**: Update order status
- **Order Details**: Complete order information
- **Customer Information**: Access customer details
- **Order Analytics**: Sales reports and insights

#### **User Management**
- **User Registration**: Admin can register new users
- **User Authentication**: Secure admin login
- **User Analytics**: User activity tracking
- **Admin Dashboard**: Comprehensive admin interface

### 🎨 Design Features

#### **UI/UX Design**
- **Black & White Theme**: Professional, clean design
- **Responsive Design**: Mobile-first approach
- **Modern Interface**: Clean, intuitive user interface
- **Smooth Animations**: Hover effects and transitions
- **Accessibility**: WCAG compliant design
- **Cross-browser Compatibility**: Works on all modern browsers

#### **Performance Features**
- **Fast Loading**: Optimized images and code
- **Lazy Loading**: Images load as needed
- **Caching**: Efficient data caching
- **SEO Optimized**: Search engine friendly
- **Progressive Web App**: PWA capabilities

## 🛠️ Technology Stack

### **Frontend Technologies**
- **React 19.1.1**: Modern JavaScript library for building user interfaces
- **React Router DOM 7.9.4**: Client-side routing
- **Tailwind CSS 4.1.15**: Utility-first CSS framework
- **Axios 1.12.2**: HTTP client for API calls
- **React Toastify 11.0.5**: Toast notifications
- **React Icons 5.5.0**: Icon library
- **Firebase 12.4.0**: Google authentication
- **Vite 7.1.7**: Fast build tool and development server

### **Backend Technologies**
- **Node.js**: JavaScript runtime environment
- **Express.js 5.1.0**: Web application framework
- **MongoDB 8.15.1**: NoSQL database
- **Mongoose 8.15.1**: MongoDB object modeling
- **JWT 9.0.2**: JSON Web Token authentication
- **Bcryptjs 3.0.2**: Password hashing
- **Multer 2.0.2**: File upload handling
- **Cloudinary 2.8.0**: Image storage and optimization
- **CORS 2.8.5**: Cross-origin resource sharing
- **Cookie Parser 1.4.7**: Cookie parsing middleware
- **Nodemon 3.1.10**: Development server

### **Database & Storage**
- **MongoDB Atlas**: Cloud database service
- **Cloudinary**: Cloud image storage and optimization
- **Local Storage**: Fallback image storage

### **Development Tools**
- **ESLint**: Code linting
- **Git**: Version control
- **VS Code**: Development environment

## 📁 Project Structure

```
PixElegant/
├── backend/                 # Backend API server
│   ├── config/             # Configuration files
│   │   ├── db.js          # Database connection
│   │   ├── cloudinary.js  # Cloudinary setup
│   │   └── token.js       # JWT configuration
│   ├── controller/        # Route controllers
│   │   ├── authController.js
│   │   ├── productController.js
│   │   ├── userController.js
│   │   └── orderController.js
│   ├── middleware/        # Custom middleware
│   │   ├── adminAuth.js
│   │   ├── isAuth.js
│   │   └── multer.js
│   ├── model/            # Database models
│   │   ├── productModel.js
│   │   ├── userModel.js
│   │   └── orderModel.js
│   ├── routes/           # API routes
│   │   ├── authRoutes.js
│   │   ├── productRoutes.js
│   │   ├── userRoutes.js
│   │   └── orderRoutes.js
│   ├── public/           # Static files
│   │   └── uploads/      # Local image storage
│   ├── index.js          # Server entry point
│   ├── package.json
│   └── .env              # Environment variables
├── frontend/              # Customer-facing React app
│   ├── src/
│   │   ├── components/   # Reusable components
│   │   │   ├── Nav.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Card.jsx
│   │   │   ├── Hero.jsx
│   │   │   └── ...
│   │   ├── pages/        # Page components
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Collections.jsx
│   │   │   ├── ProductDetail.jsx
│   │   │   ├── Cart.jsx
│   │   │   └── ...
│   │   ├── context/      # React Context
│   │   │   ├── AuthContext.jsx
│   │   │   ├── UserContext.jsx
│   │   │   └── ShopContext.jsx
│   │   ├── assets/       # Static assets
│   │   ├── utils/       # Utility functions
│   │   ├── App.jsx      # Main app component
│   │   └── main.jsx     # App entry point
│   ├── package.json
│   └── vite.config.js
├── admin/                 # Admin panel React app
│   ├── src/
│   │   ├── component/   # Admin components
│   │   ├── pages/       # Admin pages
│   │   ├── context/     # Admin context
│   │   └── assets/      # Admin assets
│   └── package.json
└── README.md
```

## 🚀 Setup Instructions

### Prerequisites

- **Node.js** (v16 or higher)
- **MongoDB Atlas** account
- **Cloudinary** account (optional)
- **Git**

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/pixelegant.git
cd pixelegant
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:

```env
PORT=4000
MONGODB_URL="your_mongodb_atlas_connection_string"
ADMIN_EMAIL="your_admin_email@gmail.com"
ADMIN_PASSWORD="your_admin_password"
JWT_SECRET="your_jwt_secret_key"
CLOUDINARY_NAME="your_cloudinary_name"
CLOUDINARY_API_KEY="your_cloudinary_api_key"
CLOUDINARY_API_SECRET="your_cloudinary_api_secret"
VITE_FIREBASE_APIKEY="your_firebase_api_key"
```

Start the backend server:

```bash
npm run dev
```

### 3. Frontend Setup

```bash
cd frontend
npm install
```

Start the frontend development server:

```bash
npm run dev
```

### 4. Admin Panel Setup

```bash
cd admin
npm install
```

Start the admin panel:

```bash
npm run dev
```

### 5. Access the Application

- **Frontend**: http://localhost:5173
- **Admin Panel**: http://localhost:5175
- **Backend API**: http://localhost:4000

## 📚 API Documentation

### Authentication Endpoints

#### User Registration
```http
POST /api/auth/registration
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

#### User Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Google OAuth Login
```http
POST /api/auth/googlelogin
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@gmail.com"
}
```

#### Admin Login
```http
POST /api/auth/adminlogin
Content-Type: application/json

{
  "email": "admin@pixelegant.com",
  "password": "admin_password"
}
```

### Product Endpoints

#### Get All Products
```http
GET /api/product/list
```

#### Add Product (Admin Only)
```http
POST /api/product/addproduct
Content-Type: multipart/form-data

{
  "name": "Product Name",
  "description": "Product Description",
  "price": 1000,
  "category": "Men",
  "subCategory": "TopWear",
  "sizes": ["S", "M", "L"],
  "bestseller": true,
  "image1": [file],
  "image2": [file],
  "image3": [file],
  "image4": [file]
}
```

#### Delete Product (Admin Only)
```http
POST /api/product/remove/:productId
```

### User Endpoints

#### Get Current User
```http
GET /api/user/getcurrentuser
Authorization: Bearer <token>
```

#### Get Admin Info
```http
GET /api/user/getadmin
Authorization: Bearer <admin_token>
```

### Order Endpoints

#### Place Order
```http
POST /api/order/placeorder
Content-Type: application/json
Authorization: Bearer <token>

{
  "address": {
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "street": "123 Main St",
    "city": "City",
    "state": "State",
    "pinCode": "12345",
    "country": "Country",
    "phone": "1234567890"
  },
  "items": [...],
  "amount": 1500,
  "paymentMethod": "Cash on Delivery"
}
```

#### Get User Orders
```http
POST /api/order/userorder
Authorization: Bearer <token>
```

## 🌐 Deployment

### Quick Deployment Guide

**PixElegant** is ready for production deployment with the following setup:

- **Backend**: Deploy to [Render](https://render.com) (Free tier available)
- **Frontend**: Deploy to [Netlify](https://netlify.com) (Free tier available)  
- **Admin Panel**: Deploy to [Netlify](https://netlify.com) (Free tier available)
- **Database**: MongoDB Atlas (Already configured)

### Deployment URLs (After Setup):
- **Backend API**: `https://pixelegant-backend.onrender.com`
- **Frontend**: `https://pixelegant-frontend.netlify.app`
- **Admin Panel**: `https://pixelegant-admin.netlify.app`

### Environment Variables Required:

#### Backend (Render):
```env
NODE_ENV=production
PORT=4000
MONGODB_URL=mongodb+srv://tanishq2127tanishq_db_user:PixElegant123@cluster0.nl9xgnl.mongodb.net/PixElegant
ADMIN_EMAIL=pixelegant@gmail.com
ADMIN_PASSWORD=PixElegant21272127
JWT_SECRET=WFYVVDFBGVHBUUGDUD
CLOUDINARY_NAME=dtfjdad4fd
CLOUDINARY_API_KEY=935529896649521
CLOUDINARY_API_SECRET=_BE5Bj15IP3FRePlzfMnlnOpqbA
VITE_FIREBASE_APIKEY=AIzaSyCBTQ4Y-7B_LiwIVIOl7GzrBmVddO3jvHM
```

#### Frontend & Admin (Netlify):
```env
VITE_SERVER_URL=https://your-backend-url.onrender.com
```

### Detailed Deployment Instructions

For complete step-by-step deployment instructions, see [DEPLOYMENT.md](DEPLOYMENT.md)

### Admin Credentials:
- **Email**: pixelegant@gmail.com
- **Password**: PixElegant21272127

## 📸 Screenshots

### Frontend Screenshots
- **Home Page**: Hero section with product showcase
- **Collections**: Product grid with filtering
- **Product Detail**: Image gallery and product information
- **Cart**: Shopping cart with item management
- **Checkout**: Order placement form

### Admin Panel Screenshots
- **Admin Dashboard**: Overview of products and orders
- **Product Management**: Add, edit, delete products
- **Order Management**: View and manage orders
- **User Management**: Admin user controls

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Tanishq Singh**
- GitHub: [@tanishqsingh](https://github.com/tanishqsingh)
- Email: pixelegant@gmail.com

## 🙏 Acknowledgments

- React team for the amazing framework
- MongoDB for the database solution
- Cloudinary for image storage
- Tailwind CSS for the styling framework
- All contributors and testers

---

**PixElegant** - Where Style Meets Elegance! 🛍️✨
