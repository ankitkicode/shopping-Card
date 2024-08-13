import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ProductContext } from '../Context/ProductContext';

const ProductDetails = () => {
  const { id } = useParams();
  const [loading,setLoading] = useState(true)
  const { products,  productdetail, setProductdetail,handleCartItems,cartItems } = useContext(ProductContext);
 
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://dummyjson.com/products/${id}`);
        const data = await response.json();
        setProductdetail(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product details:', error);
        setLoading(false);
      }
    };

    fetchProductDetails();
    
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-2xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="bg-zinc-50 text-black min-h-screen p-4">
      <h1 className="text-center pt-4 text-3xl font-bold">Product Details</h1>
      <div className="flex flex-col lg:flex-row items-center gap-8 mt-8">
        <div className="flex-shrink-0">
          <img 
            src={productdetail?.thumbnail || 'https://via.placeholder.com/400'} 
            alt={productdetail?.name || 'Product Image'} 
            className="w-full max-w-sm object-cover rounded-lg shadow-lg"
          />
        </div>
        <div className="flex flex-col gap-4 max-w-lg">
          <h2 className="text-4xl font-semibold">{productdetail?.title || 'Product Name'}</h2>
          <p className="text-lg text-gray-700">{productdetail?.description || 'Product Description'}</p>
          <p className="text-2xl font-bold text-gray-900">
            {productdetail?.price ? `$${productdetail.price}` : 'Product Price'}
          </p>
          <div className="flex gap-4 mt-4">
            <button disabled={cartItems.findIndex(item => item.id === productdetail.id) > -1} onClick={()=>handleCartItems(productdetail)} className="bg-black disabled:opacity-60 text-white p-2 px-4 rounded-lg hover:bg-gray-700transition duration-300">Add to Cart</button>
            {/* <button className="bg-green-500 text-white p-2 px-4 rounded-lg hover:bg-green-600 transition duration-300">Buy Now</button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
