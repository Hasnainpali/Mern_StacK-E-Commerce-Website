// Success route handler in your frontend application
import React, { useContext, useEffect } from 'react';
import { UserContext } from './Context Api/UserAuthContext';
import { Button } from '@mui/material';

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
    <div className='d-flex flex-column justify-content-center align-items-center  mt-4 p-5' style={{width:'50%', margin:'auto', borderRadius:"30px", backgroundColor:"ButtonShadow"}}>
      <h3>Payment Successful!</h3>
      <p>Your payment was processed successfully. Thank you for your purchase.</p>
      <div className="d-flex " style={{gap:"10px"}} >
      <Button onClick={handleGoHome} variant='contained' className='' >Go Back Home Page</Button>
      <Button onClick={handleGoOrder} variant='contained' className='' >Go Order Page</Button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
