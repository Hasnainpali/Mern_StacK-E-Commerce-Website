// Success route handler in your frontend application
import React, { useContext, useEffect } from 'react';
import { UserContext } from './Context Api/UserAuthContext';
import { Button } from '@mui/material';
import { FaThumbsUp } from "react-icons/fa6";

import './Success.css';

const PaymentSuccess = () => {
  const { setisHeaderFooter} = useContext(UserContext);



  useEffect(() => {
    setisHeaderFooter(false);
  }, [setisHeaderFooter]);

  const handleGoOrder = () => {
    window.location.href = "/order-page"
  };
  
  const handleGoHome = () => {
    window.location.href = "/"
  };

  return (
    <div className="m-2">
       <div className='d-flex flex-column justify-content-center align-items-center mt-4 successBox' style={{margin:'auto', borderRadius:"30px", backgroundColor:"ButtonShadow"}}>
       <i className='icon'> <FaThumbsUp/> </i>
      <h3 className='heading'>Payment Successful!</h3>
      {/* <p>Your payment was processed successfully. Thank you for your purchase.</p> */}
      <div className="buttn mb-3" style={{gap:"10px"}} >
      <Button onClick={handleGoHome} variant='contained' className='' >Go Home Page</Button>
      <Button onClick={handleGoOrder} variant='contained' className='' >Go Order Page</Button>
      </div>
    </div>
    </div>
  );
};

export default PaymentSuccess;
