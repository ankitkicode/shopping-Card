import React from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import ProductList from './pages/ProductList'
import ProductDetails from './pages/ProductDetails'
import ProductCart from './pages/ProductCart'

const App = () => {
  return (
    <>
    <div className='h-16 flex items-center w-full px-8 text-gray-900 bg-zinc-300 sticky top-0 z-20 justify-between '>
      <h1 className='text-xl font-bold capitalize  '>Shopping Cart</h1>
    <div className="link flex items-center gap-6">
     <Link to={'/'} className=' p-1 px-3 border-gray-700 border-2 rounded-lg text-lg font-semibold' >Product List </Link>
     <Link to={'/product-cart'} className=' p-1 px-3 border-gray-700 border-2 rounded-lg text-lg font-semibold' >Cart</Link>
     {/* <Link to={'/'} className='text-white text-lg font-semibold' >Product List </Link> */}
    </div>
    </div>
      <Routes>
        <Route path='/' element={<ProductList />} />
        <Route path='/product-details/:id' element={<ProductDetails />} />
        <Route path='/product-cart' element={<ProductCart />} />
      </Routes>


    </>
  )
}

export default App
