import React, { createContext,useContext,useEffect,useState } from 'react'
import { fetchDataFormApi, postdata } from '../utility/Api';
import { useAlert } from './AlertBox';


export const CartContext = createContext();
export const CartProvider = ({children}) => {
  const [cartItem, setCartItem]= useState()
    const { showAlert } = useAlert();

    const AddtoCart = (data) => {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user || !user.userId) {
        showAlert("Please log in to add items to the cart.", true, 3000);
        return;
      }
    
      const cartItemData = {
        ...data,
        userId: user.userId
      };
    
      postdata(`/api/cart/add`, cartItemData).then((res) => {
        if (!res.error) {
          showAlert('Item added to cart successfully!', false, 3000);
          fetchDataFormApi(`/api/cart?userId=${user.userId}`).then((res) => {
            setCartItem(res.length);
          });
        } else {
          showAlert("This Product is already added to the cart", true, 3000);
        }
      });
    }
    
    useEffect(() => {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user && user.userId) {
        fetchDataFormApi(`/api/cart?userId=${user.userId}`).then((res) => {
          setCartItem(res.length);
        });
      }
    }, []);
    
     
  return (
    <CartContext.Provider 
      value={{
        AddtoCart,
        cartItem, 
        setCartItem
       }}>
           {children}
    </CartContext.Provider>
  )
}
