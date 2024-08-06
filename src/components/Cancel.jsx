import React, { useContext, useEffect } from 'react'
import { UserContext } from './Context Api/UserAuthContext';
import { Button } from '@mui/material';
import { MdCancel } from "react-icons/md";
import './Success.css'

function Cancel() {
  const { setisHeaderFooter} = useContext(UserContext);

  useEffect(() => {
    setisHeaderFooter(false);

  }, [setisHeaderFooter]);

  const handleGoHome = () => {
    window.location.href = "/shopping-cart"
  };

  return (
    <div className="m-2">
    <div className='d-flex flex-column justify-content-center align-items-center mt-4 successBox' style={{margin:'auto', borderRadius:"30px", backgroundColor:"ButtonShadow"}}>
    <i className='iconcancel'> < MdCancel/> </i>
   <h3 className='heading'>Payment Cancel!</h3>
   {/* <p>Your payment was processed successfully. Thank you for your purchase.</p> */}
   <div className="buttn mb-3" style={{gap:"10px"}} >
   <Button onClick={handleGoHome} variant='contained' className='' >Go CheckOut Page</Button>
   </div>
 </div>
 </div>
  );
};

export default Cancel
