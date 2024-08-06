import { useEffect, useState, useRef, useContext } from "react";    
import {  IoIosArrowRoundForward, IoMdHeartEmpty } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { TfiFullscreen } from "react-icons/tfi";
import './ProductList.css'
import { fetchDataFormApi } from "./utility/Api";
import { Rating } from "@mui/material";
import { UserContext } from "./Context Api/UserAuthContext";

export default function ProductList(props) {
  const {BaseURl} = useContext(UserContext)
    const {title, description, image} = props
  const [productData, setProductData] = useState([]);
  const navigate = useNavigate()

  
  useEffect(() => {
     fetchDataFormApi(`/api/products`).then((res)=>{
      console.log(res)
       setProductData(res)
     })
  },[]);

  return (
    <>
      <section className="productbanner px-3">
        <div className="row px-xl-5">
          <div className="col-md-3 d-flex flex-wrap justify-content-center align-items-center ">
            <div className="Banner mb-2">
              <img
                src={image}
                alt="banner"
                className="cursor"
              />
            </div>
            <div className="Banner mb-2">
              <img
                src={image}
                alt="banner"
                className="cursor"
              />
            </div>
          </div>
          <div className="col-md-9 productrow  mb-4 mt-sm-4">
            <div className="d-flex align-items-center ml-auto">
              <div className="info ">
                <h3 className="hd ">{title}</h3>
                <p className="text-lightr text-sml">
                  {description}
                </p>
              </div>
              <button
                type="button"
                class="btn btn-outline-primary ml-auto button  "
              >
                <Link to={'/shop'} className="text-dark text-decoration-none">
                  View All <IoIosArrowRoundForward />
                </Link>
              </button>
            </div>
              <div className="ProductList ">
                {productData?.productList?.length !== 0 && productData?.productList?.slice(0, 6).map((products, index) => {
                  return (
                      <div className="product-item bg-light mb-4" key={index}>
                        <div className="product-img position-relative overflow-hidden px-2"  onClick={() => navigate(`/product/detail/${products.id}`)}>
                          <img
                            className="img-fluid product-imgs"
                            src={products.images[0]}
                            alt={products.name}
                          />
                         {
                           products.discount ? 
                            <span className="badelandingpage bg-primary">{products.discount}%</span>
                             :
                           null
                          }
                          <div className="product-action1 ">
                            <a
                              className="btn btn-outline-dark btn-square"
                              href="/"
                            >
                                <TfiFullscreen/>
                            </a>
                            <a
                              className="btn btn-outline-dark btn-square mt-2"
                              href="/"
                            >
                             <IoMdHeartEmpty/>
                            </a>
                          </div>

                          <div className="d-flex flex-column text-center py-4">
                            <a
                              className="h6 text-decoration-none text-truncate"
                              href="/"
                            >
                              {products.name.substring(0, 25)}
                            </a>
                            <span className="text-success h6 font-weight-semibold"> In Stock</span>
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
                  );
                })}
              </div>
            </div>
          </div>
      </section>
    </>
  );
}
