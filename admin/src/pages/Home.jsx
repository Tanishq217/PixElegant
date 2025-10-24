import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import Nav from '../component/Nav'
import Sidebar from '../component/Sidebar'
import { userDataContext } from '../context/userContext.jsx'
import { authDataContext } from '../context/authContext.jsx'
import axios from 'axios'

function Home() {
  const { userData, setUserData } = useContext(userDataContext);
  const { serverURL } = useContext(authDataContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.get(`${serverURL}/api/auth/logout`, {
        withCredentials: true
      });
      setUserData(null);
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className='w-[100vw] min-h-[100vh] bg-gray-900 text-white overflow-x-hidden relative'>
      <Nav/>
      <Sidebar/>
      
      <div className='w-[82%] min-h-[100vh] absolute right-0 top-0 flex flex-col items-center justify-center py-[100px] px-[40px] gap-[40px]'>
        <h1 className='text-4xl md:text-5xl font-bold text-white shadow-md p-4 rounded-lg bg-gray-800/80 w-full text-center'>
          Welcome to Admin Panel
        </h1>
        
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl'>
          <div className='bg-gray-800 p-6 rounded-lg shadow-lg hover:bg-gray-700 transition'>
            <h3 className='text-xl font-semibold mb-3'>Add Items</h3>
            <p className='text-gray-300 mb-4'>Add new products to your store</p>
            <button 
              onClick={() => navigate('/add')}
              className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition'
            >
              Go to Add Items
            </button>
          </div>
          
          <div className='bg-gray-800 p-6 rounded-lg shadow-lg hover:bg-gray-700 transition'>
            <h3 className='text-xl font-semibold mb-3'>List Items</h3>
            <p className='text-gray-300 mb-4'>View and manage your products</p>
            <button 
              onClick={() => navigate('/lists')}
              className='bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition'
            >
              Go to List Items
            </button>
          </div>
          
          <div className='bg-gray-800 p-6 rounded-lg shadow-lg hover:bg-gray-700 transition'>
            <h3 className='text-xl font-semibold mb-3'>View Orders</h3>
            <p className='text-gray-300 mb-4'>Check customer orders</p>
            <button 
              onClick={() => navigate('/orders')}
              className='bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition'
            >
              Go to Orders
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home