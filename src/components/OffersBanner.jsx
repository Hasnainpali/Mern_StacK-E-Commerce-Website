import React from 'react';

export default function OffersBanner() {
  return (
    <div class="container mt-4 pb-3">
        <div class="row justify-content-center px-xl-5">
            <div class="col-md-6">
            <div class="product-offer mb-30" style={{height: "200px",}}>
                <img class="img-fluid" src="img/offer-1.jpg" alt=""/>
                <div class="offer-text">
                    <h6 class="text-white text-uppercase">Save 20%</h6>
                    <h3 class="text-white mb-3">Special Offer</h3>
                    <a href="/" class="btn btn-primary">Shop Now</a>
                </div>
            </div>
            </div>
            <div class="col-md-6">
            <div class="product-offer mb-30" style={{height: "200px",}}>
                <img class="img-fluid" src="img/offer-2.jpg" alt=""/>
                <div class="offer-text">
                    <h6 class="text-white text-uppercase">Save 20%</h6>
                    <h3 class="text-white mb-3">Special Offer</h3>
                    <a href="/" class="btn btn-primary">Shop Now</a>
                </div>
            </div>
            </div>
        </div>
    </div>
  )
}
