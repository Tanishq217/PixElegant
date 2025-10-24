import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

const Sidebar = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const menuItems = [
    { name: 'Add Items', path: '/add', icon: '➕' },
    { name: 'List Items', path: '/lists', icon: '📋' },
    { name: 'View Orders', path: '/orders', icon: '📦' }
  ]

  return (
    <div className='fixed left-0 top-0 w-[18%] h-full bg-gray-800 shadow-lg z-20'>
      <div className='flex flex-col items-center py-8 px-4'>
        <h2 className='text-white text-xl font-bold mb-8'>Admin Panel</h2>
        
        <div className='w-full space-y-4'>
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                location.pathname === item.path
                  ? 'bg-white text-black font-semibold'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              <span className='text-xl'>{item.icon}</span>
              <span className='text-sm font-medium'>{item.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Sidebar
