import React, { useContext } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Add from './pages/Add.jsx'
import Lists from './pages/Lists.jsx'
import Orders from './pages/Orders.jsx'
import Login from './pages/Login.jsx'
import { userDataContext } from './context/userContext.jsx'
import About from './pages/About.jsx'
import Collections from './pages/Collections.jsx'
import Product from './pages/Product.jsx'
import Contact from './pages/Contact.jsx'


function App() {
  const { userData } = useContext(userDataContext);

  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={!userData ? <Login /> : <Navigate to="/home" replace />} />
        <Route path="/home" element={userData ? <Home /> : <Navigate to="/login" replace />} />
        <Route path="/add" element={userData ? <Add /> : <Navigate to="/login" replace />} />
        <Route path="/lists" element={userData ? <Lists /> : <Navigate to="/login" replace />} />
        <Route path="/orders" element={userData ? <Orders /> : <Navigate to="/login" replace />} />
        <Route path="/about" element={<About/>} />
        <Route path="/collection" element={<Collections/>}/>
        <Route path="/product" element={<Product/>}/>
        <Route path="/contact" element={<Contact/>}/>
      </Routes>
    </>
  )
}

export default App