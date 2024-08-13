import React, { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const ProductContext = createContext(null);

const ProductContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [productdetail, setProductdetail] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  function handleCartItems(productdetail) {
    const copyExitsItems = [...cartItems];
    const findIndexofItem = copyExitsItems.findIndex(cartItem => cartItem.id === productdetail.id);

    if (findIndexofItem === -1) {
      copyExitsItems.push({
        ...productdetail,
        quantity: 1,
        totalPrice: productdetail?.price
      });
    } else {
     copyExitsItems[findIndexofItem] ={
        ...copyExitsItems[findIndexofItem],
        quantity: copyExitsItems[findIndexofItem].quantity + 1,
        totalPrice:(copyExitsItems[findIndexofItem].quantity + 1)* copyExitsItems[findIndexofItem].price
     }
    }

    setCartItems(copyExitsItems);
    localStorage.setItem('cartItems', JSON.stringify(copyExitsItems));
    navigate('/product-cart');
  }
  function handleRemoveCartItems(getProductdetail,fullyRemoveProductDetails){
    const copyExitsItems = [...cartItems];
    const findIndexofItem = copyExitsItems.findIndex(cartItem => cartItem.id === getProductdetail.id);
    if(fullyRemoveProductDetails){
      copyExitsItems.splice(findIndexofItem,1)
    }else{
       copyExitsItems[findIndexofItem] ={
        ...copyExitsItems[findIndexofItem],
        quantity: copyExitsItems[findIndexofItem].quantity - 1,
        totalPrice:(copyExitsItems[findIndexofItem].quantity - 1)* copyExitsItems[findIndexofItem].price
       }
    //    localStorage.setItem('cardItems',JSON.stringify(copyExitsItems));

    }
    setCartItems(copyExitsItems);
    localStorage.setItem('cartItems', JSON.stringify(copyExitsItems));

  }

  useEffect(() => {
    setLoading(true);
    fetch('https://dummyjson.com/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data.products);
        setLoading(false);
      })
      .catch(() => setLoading(false)); // In case of an error, stop loading

    const storedCartItems = localStorage.getItem('cartItems');
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
  }, []); // Only run on component mount

  return (
    <ProductContext.Provider value={{ handleCartItems, handleRemoveCartItems, cartItems, products, setProducts, loading, setLoading, productdetail, setProductdetail }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContextProvider;
