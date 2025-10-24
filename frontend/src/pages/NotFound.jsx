import React from 'react'
import { useNavigate } from 'react-router-dom'

function NotFound() {
    let navigate = useNavigate()
    
    return (
        <div className='w-full min-h-screen bg-white flex items-center justify-center'>
            <div className='text-center'>
                <h1 className='text-6xl font-bold text-black mb-4'>404</h1>
                <h2 className='text-2xl font-semibold text-gray-700 mb-6'>Page Not Found</h2>
                <p className='text-gray-600 mb-8'>The page you're looking for doesn't exist.</p>
                <div className='space-x-4'>
                    <button 
                        className='bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors'
                        onClick={() => navigate("/home")}
                    >
                        Go Home
                    </button>
                    <button 
                        className='bg-gray-200 text-black px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors'
                        onClick={() => navigate("/login")}
                    >
                        Login
                    </button>
                </div>
            </div>
        </div>
    )
}

export default NotFound
