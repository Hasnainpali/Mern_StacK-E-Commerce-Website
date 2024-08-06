import React, { useContext, useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CartContext } from "./Context Api/ShopContext";
import Slider from "react-slick";
import { fetchDataFormApi, postdata } from "./utility/Api";
import { Rating } from "@mui/material";
import { UserContext } from "./Context Api/UserAuthContext";
import { IoMdHeartEmpty } from "react-icons/io";
import { TfiFullscreen } from "react-icons/tfi";

export default function ShopDetail() {
  const { setAlertBox } = useContext(UserContext);
  const { AddtoCart } = useContext(CartContext);
  const [products, setProduct] = useState({
    images: [],
    productSize: [],
    productRAMS: [],
  });
  const [relatedProduct, setRelatedProduct] = useState([]);
  const [rating, setRating] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedRam, setSelectedRam] = useState("");
  const [inputVal, setInputVal] = useState(1);
  const [reviewData, setReviewData] = useState([]);
  let [reviews, setReviews] = useState({
    productId: "",
    customerName: "",
    customerId: "",
    Review: "",
    customerRating: "",
  });
  const [productQty, setProductQty] = useState(1);
  const { id } = useParams();
  const navigate = useNavigate();
  const ProductSliderBig = useRef();
  const ProductSliderSml = useRef();

  var ProductSlider = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };
  var ProductsmlSlider = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
  };
    
  useEffect(() => {
    fetchDataFormApi(`/api/productReview?productId=${id}`).then((res) => {
      setReviewData(res);
    });
  }, [id]);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchDataFormApi(`/api/products/${id}`).then((res) => {
      setProduct(res);
      fetchDataFormApi(`/api/products?catID=${res?.catID}`).then((res) => {
        const filterProduct = res?.productList?.filter(
          (item) => item.id !== id
        );
        setRelatedProduct(filterProduct);
      });
    });
  }, [id]);
  
  const GoToSlider = (index) => {
    ProductSliderBig.current.slickGoTo(index);
    ProductSliderSml.current.slickGoTo(index);
  };
  
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Intl.DateTimeFormat("en-US", options).format(new Date(dateString));
  };

  const handleSizeChange = (e) => {
    setSelectedSize(e.target.value);
  };

  const handleRamChange = (e) => {
    setSelectedRam(e.target.value);
  };

  const qunatity = (val) => {
    setProductQty(val);
  };

  useEffect(() => {
    qunatity(inputVal);
  }, [inputVal]);

  const minus = () => {
    if (inputVal !== 1 && inputVal > 0) {
      setInputVal(inputVal - 1);
    }
  };
  const plus = () => {
    setInputVal(inputVal + 1);
  };

  const addtoCart = (data) => {
    if (data.productSize.length > 0 && !selectedSize) {
      setAlertBox({
        open: true,
        error: true,
        msg: "Select the Size",
      });
      return;
    }
    if (data.productRAMS.length > 0 && !selectedRam) {
      setAlertBox({
        open: true,
        error: true,
        msg: "Select the Ram",
      });
      return;
    }
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      setAlertBox({
        open: true,
        error: true,
        msg: "You are not Login so firstly you are login then purchase item"
      });
      return;
    }
    const cartItems = {
      productTitle: data?.name,
      images: data?.images[0],
      price: data?.price,
      quantity: productQty,
      subTotal: parseInt(data?.price * productQty),
      productId: data?.id,
      userId: user?.userId,
      size: selectedSize,
      ram: selectedRam,
    };
    
    console.log("Adding to cart:", cartItems); // Debug log
    
    AddtoCart(cartItems);
  };
  
  const onChangeInput = (e) => {
    setReviews(() => ({
      ...reviews,
      [e.target.name]: e.target.value,
    }));
  };

  const onChangeRating = (e) => {
    const ratingValue = parseInt(e.target.value, 10);
    setRating(ratingValue);
    setReviews((prevReviews) => ({
      ...prevReviews,
      customerRating: ratingValue,
    }));
  };

  const addReview = (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("user"));
    reviews.customerId = user.userId;
    reviews.productId = id;
    reviews.customerName = user.name;
    postdata("/api/productReview/add", reviews).then((res) => {
      console.log(res);
      setReviews({
        Review: "",
        customerRating: 1,
      });
      fetchDataFormApi(`/api/productReview?productId=${id}`).then((res) => {
        setReviewData(res);
      });
    });
  };

  const reviewCount = reviewData.length;

  return (
    <div className="container-fluid pb-5">
      <div className="row px-xl-5">
        <div className="col-12">
          <nav className="breadcrumb bg-light mb-30">
            <a className="breadcrumb-item text-dark" href="/">
              Home
            </a>
            <a className="breadcrumb-item text-dark" href="/product">
              Shop
            </a>
            <span className="breadcrumb-item active">Shop Detail</span>
          </nav>
        </div>
      </div>

      <div>
        <div className="row px-xl-5">
          <div className="col-lg-5 mb-30">
            <div>
              <div className="bg-light position-relative">
                {products.discount ? (
                  <span className="bade bg-primary">{products.discount}%</span>
                ) : null}
                {products.images && products.images.length > 0 && (
                  <Slider
                    {...ProductSlider}
                    ref={ProductSliderBig}
                    className="sliderBig mb-2"
                  >
                    {products.images.map((item, index) => (
                      <div className="item" key={index}>
                        <img className="w-100" src={item} alt={""} />
                      </div>
                    ))}
                  </Slider>
                )}
                {products.images && products.images.length > 0 && (
                  <Slider
                    {...ProductsmlSlider}
                    ref={ProductSliderSml}
                    className="sliderSml"
                  >
                    {products.images.map((item, index) => (
                      <div
                        className="item"
                        key={index}
                        onClick={() => GoToSlider(index)}
                      >
                        <img className="w-100" src={item} alt={""} />
                      </div>
                    ))}
                  </Slider>
                )}
              </div>
            </div>
          </div>

          <div className="col-lg-7 h-auto mb-30">
            <div className="h-100 bg-light p-30">
              <h3>{products.name} </h3>
              <h6 className="font-weight-bold my-3">
                Brand : {products.brand}
              </h6>
              <div className="d-flex mb-3">
                <Rating
                  name="read-only"
                  value={parseInt(products.rating)}
                  precision={0.5}
                  readOnly
                />
              </div>
              <div className="d-flex gap-2">
                <h3 className="font-weight-light mb-4">Rs:{products.price}</h3>
                <h3 className=" mb-4 ml-2">
                  <del>{products.oldPrice}</del>
                </h3>
              </div>
              <p className="mb-4">
                <span className="font-weight-bold">Description : </span>
                {products.description}
              </p>
              {products.productSize && products.productSize.length > 0 && (
                <div className="d-flex mb-3">
                  <strong className="text-dark mr-3">Sizes:</strong>
                  <div className="pt-1">
                    {products.productSize.map((item, index) => (
                      <div
                        className={`custom-control custom-radio custom-control-inline `}
                        key={index}
                      >
                        <input
                          type="radio"
                          className="custom-control-input"
                          id={`size-${index}`}
                          name="size"
                          value={item}
                          onChange={handleSizeChange}
                        />
                        <label
                          className="custom-control-label"
                          htmlFor={`size-${index}`}
                        >
                          {item}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {products.productRAMS && products.productRAMS.length > 0 && (
                <div className="d-flex mb-3">
                  <strong className="text-dark mr-3">Rams:</strong>
                  <div className="pt-1">
                    {products.productRAMS.map((item, index) => (
                      <div
                        className="custom-control custom-radio custom-control-inline"
                        key={index}
                      >
                        <input
                          type="radio"
                          className="custom-control-input"
                          id={`ram-${index}`}
                          name="ram"
                          value={item}
                          onChange={handleRamChange}
                        />
                        <label
                          className="custom-control-label"
                          htmlFor={`ram-${index}`}
                        >
                          {item}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <div className="d-flex align-items-center mb-4 pt-2">
                <div
                  className="input-group quantity mr-3"
                  style={{ width: "130px" }}
                >
                  <div className="input-group-btn">
                    <button
                      className="btn btn-primary btn-minus"
                      onClick={minus}
                    >
                      <i className="fa fa-minus"></i>
                    </button>
                  </div>
                  <input
                    type="text"
                    className="form-control bg-secondary border-0 text-center"
                    value={inputVal}
                    onClick={qunatity}
                  />
                  <div className="input-group-btn">
                    <button className="btn btn-primary btn-plus" onClick={plus}>
                      <i className="fa fa-plus"></i>
                    </button>
                  </div>
                </div>
                <button
                  className="btn btn-primary px-3"
                  onClick={() => addtoCart(products)}
                >
                  <i className="fa fa-shopping-cart mr-1"></i> Add To Cart
                </button>
              </div>
              <div className="d-flex pt-2">
                <strong className="text-dark mr-2">Share on:</strong>
                <div className="d-inline-flex">
                  <a className="text-dark px-2" href="/">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a className="text-dark px-2" href="/">
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a className="text-dark px-2" href="/">
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                  <a className="text-dark px-2" href="/">
                    <i className="fab fa-pinterest"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row px-xl-5">
          <div className="col">
            <div className="bg-light p-30">
              <div className="nav nav-tabs mb-4">
                <a
                  className="nav-item nav-link text-dark active"
                  data-toggle="tab"
                  href="#tab-pane-1"
                >
                  Description
                </a>
                <a
                  className="nav-item nav-link text-dark"
                  data-toggle="tab"
                  href="#tab-pane-2"
                >
                  Information
                </a>
                <a
                  className="nav-item nav-link text-dark"
                  data-toggle="tab"
                  href="#tab-pane-3"
                >
                  Reviews({reviewCount})
                </a>
              </div>
              <div className="tab-content">
                <div className="tab-pane fade show active" id="tab-pane-1">
                  <h4 className="mb-3">Product Description</h4>
                  <p>{products.description}</p>
                </div>
                <div className="tab-pane fade" id="tab-pane-2">
                  <h4 className="mb-3">Additional Information</h4>
                  <p>
                    Eos no lorem eirmod diam diam, eos elitr et gubergren diam
                    sea. Consetetur vero aliquyam invidunt duo dolores et duo
                    sit. Vero diam ea vero et dolore rebum, dolor rebum eirmod
                    consetetur invidunt sed sed et, lorem duo et eos elitr,
                    sadipscing kasd ipsum rebum diam. Dolore diam stet rebum sed
                    tempor kasd eirmod. Takimata kasd ipsum accusam sadipscing,
                    eos dolores sit no ut diam consetetur duo justo est, sit
                    sanctus diam tempor aliquyam eirmod nonumy rebum dolor
                    accusam, ipsum kasd eos consetetur at sit rebum, diam kasd
                    invidunt tempor lorem, ipsum lorem elitr sanctus eirmod
                    takimata dolor ea invidunt.
                  </p>
                  <div className="row">
                    <div className="col-md-6">
                      <ul className="list-group list-group-flush">
                        <li className="list-group-item px-0">
                          Sit erat duo lorem duo ea consetetur, et eirmod
                          takimata.
                        </li>
                        <li className="list-group-item px-0">
                          Amet kasd gubergren sit sanctus et lorem eos
                          sadipscing at.
                        </li>
                        <li className="list-group-item px-0">
                          Duo amet accusam eirmod nonumy stet et et stet eirmod.
                        </li>
                        <li className="list-group-item px-0">
                          Takimata ea clita labore amet ipsum erat justo
                          voluptua. Nonumy.
                        </li>
                      </ul>
                    </div>
                    <div className="col-md-6">
                      <ul className="list-group list-group-flush">
                        <li className="list-group-item px-0">
                          Sit erat duo lorem duo ea consetetur, et eirmod
                          takimata.
                        </li>
                        <li className="list-group-item px-0">
                          Amet kasd gubergren sit sanctus et lorem eos
                          sadipscing at.
                        </li>
                        <li className="list-group-item px-0">
                          Duo amet accusam eirmod nonumy stet et et stet eirmod.
                        </li>
                        <li className="list-group-item px-0">
                          Takimata ea clita labore amet ipsum erat justo
                          voluptua. Nonumy.
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="tab-pane fade" id="tab-pane-3">
                  <div className="row">
                    <div className="col-md-6">
                      {reviewData?.map((item, index) => {
                        return (
                          <div className="media mb-4" key={index}>
                            <div className="user-img mr-2">
                              <span className="rounded-circle">
                                {item.customerName.charAt(0)}
                              </span>
                            </div>
                            <div className="media-body">
                              <h6>
                                {item.customerName}
                                <small>
                                  {" "}
                                  - <i>{formatDate(item.dateCreated)}</i>
                                </small>
                              </h6>
                              <div className="text-primary mb-2">
                                <Rating value={item.customerRating} />
                              </div>
                              <p>{item.Review}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <div className="col-md-6">
                      <h4 className="mb-4">Leave a review</h4>
                      <small>
                        Your email address will not be published. Required
                        fields are marked *
                      </small>
                      <form onSubmit={addReview}>
                        <div className="form-group">
                          <label for="message">Your Review *</label>
                          <textarea
                            cols="30"
                            rows="5"
                            className="form-control"
                            name="Review"
                            onChange={onChangeInput}
                          ></textarea>
                        </div>
                        {/* <div className="form-group">
                          <label for="name">Your Name *</label>
                          <input
                            type="text"
                            className="form-control"
                            id="name"
                            name="customerName"
                            onChange={onChangeInput}
                          />
                        </div> */}
                        <div className="d-flex my-3">
                          <Rating
                            name="customerRating"
                            onChange={onChangeRating}
                            value={rating}
                            precision={0.5}
                          />
                        </div>
                        {/* <div className="form-group">
                          <label for="email">Your Email *</label>
                          <input
                            type="email"
                            className="form-control"
                            id="email"
                          />
                        </div> */}
                        <div className="form-group mb-0">
                          <button
                            type="submit"
                            className="btn btn-primary px-3"
                          >
                            Submit Review
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row px-xl-5">
          <div className="col-md-12 productrow  mb-4 mt-sm-4">
            <div className="d-flex align-items-center ml-auto">
              <div className="info ">
                <h3 className="hd ">Related Product</h3>
                {/* <p className="text-lightr text-sml">
                  {description}
                </p> */}
              </div>
            </div>
            <div className="relatedProduct mt-4">
              {relatedProduct?.length !== 0 &&
                relatedProduct?.map((products, index) => {
                  return (
                    <div className="product-item bg-light mb-4" key={index}>
                      <div
                        className="product-img position-relative overflow-hidden px-2"
                        onClick={() =>
                          navigate(`/product/detail/${products.id}`)
                        }
                      >
                        <img
                          className="img-fluid product-imgs"
                          src={products.images[0]}
                          alt={products.name}
                        />
                        {products.discount ? (
                          <span className="badelandingpage bg-primary">
                            {products.discount}%
                          </span>
                        ) : null}
                        <div className="product-action1 ">
                          <a
                            className="btn btn-outline-dark btn-square"
                            href="/"
                          >
                            <TfiFullscreen />
                          </a>
                          <a
                            className="btn btn-outline-dark btn-square mt-2"
                            href="/"
                          >
                            <IoMdHeartEmpty />
                          </a>
                        </div>

                        <div className="d-flex flex-column text-center py-4">
                          <a
                            className="h6 text-decoration-none text-truncate"
                            href="/"
                          >
                            {products.name.substring(0, 25)}
                          </a>
                          <span className="text-success h6 font-weight-semibold">
                            {" "}
                            In Stock
                          </span>
                          <div className="d-flex align-items-center justify-content-center mb-1">
                            <Rating
                              name="read-only"
                              value={products.rating}
                              precision={0.5}
                              readOnly
                            />
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
      </div>
    </div>
  );
}
