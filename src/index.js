import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from './components/Context Api/ShopContext';
import { UserProvide } from './components/Context Api/UserAuthContext';
import { AlertProvider } from './components/Context Api/AlertBox';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <AlertProvider>
      <CartProvider>
        <UserProvide>
           <App />
         </UserProvide>
      </CartProvider>
    </AlertProvider> 
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
