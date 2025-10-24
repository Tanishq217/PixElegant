import React from 'react'
import Nav from '../component/Nav'
import Sidebar from '../component/Sidebar'

function Orders() {
  return (
    <div className='w-[100vw] min-h-[100vh] bg-gray-900 text-white overflow-x-hidden relative'>
      <Nav/>
      <Sidebar/>
      
      <div className='w-[82%] min-h-[100vh] absolute right-0 top-0 flex flex-col items-center py-[100px] px-[40px] gap-[40px]'>
        <h1 className='text-4xl md:text-5xl font-bold text-white shadow-md p-4 rounded-lg bg-gray-800/80 w-full text-center'>
          View Orders
        </h1>
        
        <div className='w-full max-w-4xl'>
          <div className='bg-gray-800 rounded-lg p-8 text-center'>
            <h3 className='text-xl font-semibold mb-4'>Orders Management</h3>
            <p className='text-gray-300 mb-6'>
              This section will display customer orders. Orders functionality will be implemented in the next phase.
            </p>
            <div className='bg-gray-700 rounded-lg p-4'>
              <p className='text-sm text-gray-400'>
                Orders will be fetched from the database and displayed here with customer details, 
                product information, and order status.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Orders