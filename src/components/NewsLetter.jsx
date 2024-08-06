import React from 'react';
import './NewsLetter.css';

function NewsLetter() {
  return (
    <section className='newsLetter bg-primary mt-3 mb-3 d-flex align-items-center'>
      <div className="container">
        <div className="row">
          <div className="col-md-6 mt-3">
            <p className='text-white mb-1'>20% discount for your First Order</p>
            <h3 className='text-white'>Subscribe to our Newsletter</h3>
            <p className=''>Join our email subscription now to get updates on promotions and  coupons</p>
            <form action="">
                  <div class="input-group">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Your Email Address"
                    
                    />
                    <div class="input-group-append">
                      <button class="btn btn-dark">Sign Up</button>
                    </div>
                  </div>
                </form>
          </div>
        </div>
      </div>
         
    </section>
  )
}

export default NewsLetter
