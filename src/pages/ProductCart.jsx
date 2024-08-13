import React, { useContext } from 'react';
import { ProductContext } from '../Context/ProductContext';
import { Link } from 'react-router-dom';

const ProductCart = () => {
  const {cartItems,handleRemoveCartItems,handleCartItems} = useContext(ProductContext);
  console.log()
  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <h1 className="text-center text-3xl font-bold mb-8">Shopping Cart</h1>

      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-4">
        {/* Cart Items */}
        {cartItems.length > 0 ? (
          <div>
 {cartItems.map((item, index) => (
        <div className="flex flex-col gap-6 ">
          {/* Cart Item */}
          <div className="flex flex-col lg:flex-row items-center gap-4 border-b pb-4">
            <img
              src={item?.thumbnail || 'https://via.placeholder.com/400'}
              alt="Product Image"
              className="w-32 h-32 object-cover rounded-lg"
            />
            <div className="flex flex-col flex-grow gap-2">
              <h2 className="text-xl font-semibold">{item.title}</h2>
              <p className="text-lg text-gray-700">Price: ${item.totalPrice}</p>
              <div className="flex items-center gap-4">
               Quantity: 
               <button button onClick={()=>handleRemoveCartItems(item,false)} disabled={item?.quantity === 1} className='py-1 disabled:opacity-20 disabled:bg-zinc-400 px-3 rounded-md text-xl  bg-gray-300 hover:bg-zinc-400 duration-150 '>-</button>
                <span>{item.quantity}</span>
                <button onClick={()=>handleCartItems(item)} className='py-1 px-3 rounded-md text-xl  bg-gray-300 hover:bg-zinc-400 duration-150 '>+</button>
              </div>
            </div>
            <button onClick={()=>handleRemoveCartItems(item,true)} className="text-red-500 bg-slate-300 py-2 px-4 rounded-md hover:text-red-700 transition duration-300">
              Remove
            </button>
          </div>

          {/* Repeat similar Cart Item for more products */}
        </div>
        ))}
          </div>
        ):(
          <div className="text-center text-2xl text-gray-500">
            Your cart is empty
          </div>
        )}
       
       

        {/* Cart Summary */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-4 mt-8">
          <div className="text-lg font-semibold">
            Total: <span className="text-2xl">${cartItems.reduce((acc,curr) => acc + curr.totalPrice,0).toFixed(2)}</span>
          </div>
         <div className='flex gap-3'>
         <button className="bg-blue-500 text-white p-2 px-6 rounded-lg hover:bg-blue-600 transition duration-300">
            Proceed to Checkout
          </button>
          <Link to={'/'}  className="bg-black text-center text-white p-2 px-6 rounded-lg hover:bg-gray-600 transition duration-300">
            Continue to Shopping
          </Link>
         </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCart;
