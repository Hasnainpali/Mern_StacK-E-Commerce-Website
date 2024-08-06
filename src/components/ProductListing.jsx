import React, { useState, useEffect, useContext } from "react";
import './Shop.css';
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "./Context Api/UserAuthContext";
import { fetchDataFormApi } from "./utility/Api";
import { Rating, Slider, Typography } from "@mui/material";

function valuetext(value) {
  return `${value} `;
}

export default function ProductListing() {
  const [productData, setProductData] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 80000]);
  const { id } = useParams();
  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setPriceRange(newValue);
    filterByPrice(newValue, id);
  };

  useEffect(() => {
    fetchDataFormApi(`/api/products?catID=${id}`).then((res) => {
      console.log(res);
      setProductData(res);
    });
  }, [id]);

  const filterByPrice = (price, catID) => {
    fetchDataFormApi(`/api/products?minPrice=${price[0]}&maxPrice=${price[1]}&catID=${catID}`).then((res) => {
      setProductData(res);
    });
  };

  return (
    <div className="container-fluid">
      <div className="row px-xl-5">
        <div className="col-12">
          <nav className="breadcrumb bg-light mb-30">
            <a className="breadcrumb-item text-dark" href="/">Home</a>
            <a className="breadcrumb-item text-dark" href="/">Category</a>
          </nav>
        </div>
      </div>
      <div className="row px-xl-5">
        <div className="col-lg-3 col-md-4">
          <h5 className="section-title position-relative text-uppercase mb-3">
            <span className="bg-secondary pr-3">Filter by price</span>
          </h5>
          <div className="bg-light p-4 mb-30">
            <Slider
              getAriaLabel={() => 'Price range'}
              value={priceRange}
              onChange={handleChange}
              valueLabelDisplay="auto"
              getAriaValueText={valuetext}
              min={0}
              max={80000}
              
            />
            <div className="price-range-labels d-flex justify-content-between">
               <Typography variant="caption" color={"black"}>Min: {priceRange[0]}</Typography>
               <Typography variant="caption" color={"black"}>Max: {priceRange[1]}</Typography>
            </div>
          </div>
        </div>
        <div className="col-lg-9 col-md-8">
          <div className="row pb-3">
            <div className="col-12 pb-1">
              <div className="d-flex align-items-center justify-content-between mb-4">
                <div>
                  <button className="btn btn-sm btn-light">
                    <i className="fa fa-th-large"></i>
                  </button>
                  <button className="btn btn-sm btn-light ml-2">
                    <i className="fa fa-bars"></i>
                  </button>
                </div>
                <div className="ml-2">
                  <div className="btn-group">
                    <button
                      type="button"
                      className="btn btn-sm btn-light dropdown-toggle"
                      data-toggle="dropdown"
                    >
                      Sorting
                    </button>
                    <div className="dropdown-menu dropdown-menu-right">
                      <a className="dropdown-item" href="/">Latest</a>
                      <a className="dropdown-item" href="/">Popularity</a>
                      <a className="dropdown-item" href="/">Best Rating</a>
                    </div>
                  </div>
                  <div className="btn-group ml-2">
                    <button
                      type="button"
                      className="btn btn-sm btn-light dropdown-toggle"
                      data-toggle="dropdown"
                    >
                      Showing
                    </button>
                    <div className="dropdown-menu dropdown-menu-right">
                      <a className="dropdown-item" href="/">10</a>
                      <a className="dropdown-item" href="/">20</a>
                      <a className="dropdown-item" href="/">30</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row pb-1">
              {productData?.productList?.length !== 0 &&
                productData?.productList?.map((products, index) => (
                  <div className="d-flex flex-wrap ml-3 product-item bg-light mb-4" key={index}>
                    <div
                      className="product-img position-relative overflow-hidden"
                      onClick={() => navigate(`/product/detail/${products.id}`)}
                    >
                      <img
                        className="img-fluid product-imgs"
                        src={products.images[0]}
                        alt={products.name}
                      />
                      <div className="product-action">
                        <a className="btn btn-outline-dark btn-square" href="/">
                          <i className="fa fa-shopping-cart"></i>
                        </a>
                        <a className="btn btn-outline-dark btn-square" href="/">
                          <i className="far fa-heart"></i>
                        </a>
                      </div>
                      <div className="d-flex flex-column text-center py-4">
                        <a className="h6 text-decoration-none text-truncate" href="/">
                          {products.name.substring(0, 25)}
                        </a>
                        <span className="text-success h6 font-weight-semibold">In Stock</span>
                        <div className="d-flex align-items-center justify-content-center mb-1">
                          <Rating name="read-only" value={products.rating} precision={0.5} readOnly />
                        </div>
                        <div className="d-flex align-items-center justify-content-center mt-2">
                          <h5>Rs{products.price}</h5>
                          <h6 className="text-muted ml-2">
                            <del>Rs{products.oldPrice}</del>
                          </h6>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
