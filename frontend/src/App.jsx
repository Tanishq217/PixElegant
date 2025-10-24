import React, { useContext } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Nav from "./components/Nav.jsx";
import Registration from "./pages/Registration.jsx";
import Login from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Collections from "./pages/Collections.jsx";
import Contact from "./pages/Contact.jsx";
import Cart from "./pages/Cart.jsx";
import Order from "./pages/Order.jsx";
import PlaceOrder from "./pages/PlaceOrder.jsx";
import Product from "./pages/Product.jsx";
import ProductDetail from "./pages/ProductDetail.jsx";
import NotFound from "./pages/NotFound.jsx";
import Footer from "./components/Footer.jsx";
import { userDataContext } from './context/UserContext.jsx';
import ShopContext from './context/ShopContext.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const { userData } = useContext(userDataContext);
  const location = useLocation();

  // Only hide Nav on login/signup pages
  const hideNav = location.pathname === "/login" || location.pathname === "/signup";

  return (
    <ShopContext>
      <div className="min-h-screen bg-white text-black">
        {!hideNav && <Nav />}
        
        <main className={hideNav ? "" : "pt-16"}>
          <Routes>
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route path="/signup" element={!userData ? <Registration /> : <Navigate to="/home" replace />} />
            <Route path="/login" element={!userData ? <Login /> : <Navigate to="/home" replace />} />
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/collections" element={<Collections />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/order" element={<Order />} />
            <Route path="/placeorder" element={<PlaceOrder />} />
            <Route path="/product" element={<Product />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        
        {!hideNav && <Footer />}
        
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </ShopContext>
  );
}

export default App;
