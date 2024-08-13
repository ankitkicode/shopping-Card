import React, { useContext } from 'react'
import ProductContextProvider, { ProductContext } from '../Context/ProductContext'
import { Link } from 'react-router-dom';

const ProductList = () => {
  const { products, loading,cartItems,handleCartItems } = useContext(ProductContext);
  console.log(products)
  if (loading) return <h1 className='h-screen w-full flex items-center justify-center text-2xl'>Loading</h1>
  return (
    <div className='bg-zinc-200 text-black text-xl h-auto w-full'>
      <h1 className='text-3xl text-center font-bold pt-5'>Product list Page</h1>
      <div className='grid grid-cols-4 max-[740px]:grid-cols-1 gap-4 p-8 m-auto w-[80%]'>
        {products.map(product => (
          <div key={product.id} className='bg-white py-4 px-2 rounded border-2 border-black'>
            <div className='bg-white w-full '>
              <img src={product.thumbnail} className='h-full w-full object-cover hover:scale-125 duration-100' alt="" />
            </div>
            <div className='flex items-start justify-between mt-4 mb-4 '>
            <h1 className='text-xl font-semibold text-ellipsis whitespace-nowrap w-[100px] overflow-hidden'>{product.title}</h1>

            <p className='text-lg'>${product.price}</p>
            </div>

          <div className='flex  gap-1 py-2'>
            
<Link to={`/product-details/${product.id}`} className='border-2 border-black text-black text-center w-[50%] py-2 px-3  m-auto ml-0  '>
  View
  </Link>
  <button disabled={cartItems.findIndex(item => item.id === product.id) > -1} onClick={()=>handleCartItems(product)} className="bg-black disabled:opacity-60  w-[50%]  text-white py-2 px-4  hover:bg-gray-700  duration-300">Add</button>

          </div>
        </div>
        ))}
      </div>
    </div>
  )

}


export default ProductList
