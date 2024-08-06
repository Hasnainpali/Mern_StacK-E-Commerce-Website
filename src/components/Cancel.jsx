import React, { useContext, useEffect } from 'react'
import { UserContext } from './Context Api/UserAuthContext';
import { Button } from '@mui/material';

function Cancel() {
  const { setisHeaderFooter} = useContext(UserContext);

  useEffect(() => {
    setisHeaderFooter(false);

  }, [setisHeaderFooter]);

  const handleGoHome = () => {
    window.location.href = "/shopping-cart"
  };

  return (
    <div className='d-flex flex-column justify-content-center align-items-center  mt-4 p-5' style={{width:'50%', margin:'auto', borderRadius:"30px", backgroundColor:"ButtonShadow"}}>
      <h3>Payment Cancel!</h3>
      <p>Your payment are not successfully. Go Back and try again </p>
      <Button onClick={handleGoHome} variant='contained' className='' >Go Back Checkout Page</Button>
    </div>
  );
};

export default Cancel
