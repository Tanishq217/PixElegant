import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import logo from "../assets/one.png"
import { authDataContext } from '../context/authContext.jsx'
import { userDataContext } from '../context/userContext.jsx'
import axios from 'axios'
import { toast } from 'react-toastify'

function Nav() {
    const navigate = useNavigate()
    const { serverURL } = useContext(authDataContext)
    const { setUserData } = useContext(userDataContext)

    const handleLogout = async () => {
        try {
            await axios.get(`${serverURL}/api/auth/logout`, { withCredentials: true })
            setUserData(null)
            toast.success("Logged out successfully")
            navigate("/login")
        } catch (error) {
            console.error(error)
            toast.error("Logout failed")
        }
    }

    return (
        <nav className='w-full h-[70px] bg-white fixed top-0 flex items-center justify-between px-8 shadow-md z-10 border-b border-gray-200'>
            <div className='flex items-center gap-3 cursor-pointer' onClick={() => navigate("/")}>
                <img src={logo} alt="PixElegant Logo" className='w-10 h-10'/>
                <span className='text-xl font-bold text-black'>PixElegant Admin</span>
            </div>
            <button 
                className='bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-lg transition'
                onClick={handleLogout}
            >
                Logout
            </button>
        </nav>
    )
}

export default Nav
