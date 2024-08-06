import React, { useState, useEffect, useContext } from "react";
import "./Shop.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { UserContext } from "./Context Api/UserAuthContext";
import { fetchDataFormApi } from "./utility/Api";
import { Rating, Slider, Typography } from "@mui/material";
import { Button, CircularProgress } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import ProductBar from "./Skeleton/Product.bar";

function valuetext(value) {
  return `${value}`;
}

export default function Shop() {
  const { BaseURl } = useContext(UserContext);
  const [catData, setCatData] = useState([]);
  const [productData, setProductData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [catID, setCatID] = useState("");
  const [priceRange, setPriceRange] = useState([0, 80000]);
  const { id } = useParams();
  const navigate = useNavigate();
  const [value, setValue] = useState("All");
  const [isLoading, setisLoading] = useState(false);

  // Fetch categories
  useEffect(() => {
    fetchDataFormApi(`/api/categorys`).then((res) => {
      setCatData(res);
    });
  }, []);

  // Fetch all products initially
  useEffect(() => {
    setisLoading(true);
    fetchDataFormApi(`/api/products`).then((res) => {
      setProductData(res.productList);
      setFilteredData(res.productList);
      setisLoading(false);
    });
  }, []);

  // Set category ID based on URL params
  useEffect(() => {
    setCatID(id || "All");
    setValue(id || "All");
  }, [id]);

  // Filter products based on category and price range
  useEffect(() => {
    const filterProducts = () => {
      let filtered = productData;

      if (catID && catID !== "All") {
        filtered = filtered.filter((product) => product.catID === catID);
      }

      filtered = filtered.filter(
        (product) =>
          product.price >= priceRange[0] && product.price <= priceRange[1]
      );

      setFilteredData(filtered);
    };

    filterProducts();
  }, [productData, catID, priceRange]);

  const handleChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  const handleChangeFilter = (event) => {
    const selectedCatID = event.target.value;
    setValue(selectedCatID);
    setCatID(selectedCatID);
  };

  return (
    <div className="container-fluid">
      <div className="row px-xl-5">
        <div className="col-12">
          <nav className="breadcrumb bg-light mb-30">
            <a className="breadcrumb-item text-dark" href="/">
              Home
            </a>
            <a className="breadcrumb-item text-dark" href="/">
              Shop
            </a>
            <span className="breadcrumb-item active">Shop List</span>
          </nav>
        </div>
      </div>
      <div className="row px-xl-5">
        <div className="col-lg-3 col-md-4">
          <h5 className="section-title position-relative text-uppercase mb-3">
            <span className="bg-secondary pr-3">Filter by Category</span>
          </h5>
          <div className="bg-light p-4 mb-30">
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={value}
              onChange={handleChangeFilter}
            >
              <FormControlLabel value="All" control={<Radio />} label="All" />
              {catData?.categoryList?.length > 0 &&
                catData.categoryList.map((item) => (
                  <FormControlLabel
                    key={item.id}
                    value={item.id}
                    control={<Radio />}
                    label={item.name}
                  />
                ))}
            </RadioGroup>
          </div>
          <h5 className="section-title position-relative text-uppercase mb-3">
            <span className="bg-secondary pr-3">Filter by Price</span>
          </h5>
          <div className="bg-light p-4 mb-30">
            <Slider
              getAriaLabel={() => "Price range"}
              value={priceRange}
              onChange={handleChange}
              valueLabelDisplay="auto"
              getAriaValueText={valuetext}
              min={0}
              max={80000}
            />
            <div className="price-range-labels d-flex justify-content-between">
              <Typography variant="caption" color={"black"}>
                Min: {priceRange[0]}
              </Typography>
              <Typography variant="caption" color={"black"}>
                Max: {priceRange[1]}
              </Typography>
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
                      <a className="dropdown-item" href="/">
                        Latest
                      </a>
                      <a className="dropdown-item" href="/">
                        Popularity
                      </a>
                      <a className="dropdown-item" href="/">
                        Best Rating
                      </a>
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
                      <a className="dropdown-item" href="/">
                        10
                      </a>
                      <a className="dropdown-item" href="/">
                        20
                      </a>
                      <a className="dropdown-item" href="/">
                        30
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row pb-1 pl-3">
              {isLoading === true ? (
                <ProductBar count={6} />
              ) : (
                <>
                  {filteredData?.length > 0 &&
                    filteredData?.map((product) => (
                      <div
                        className="d-flex flex-wrap ml-3 product-item bg-light mb-4"
                        key={product.id}
                      >
                        <div
                          className="product-img position-relative overflow-hidden"
                          onClick={() =>
                            navigate(`/product/detail/${product.id}`)
                          }
                        >
                          <img
                            className="img-fluid product-imgs"
                            src={product.images[0]}
                            alt={product.name}
                          />
                          <div className="product-action">
                            <a
                              className="btn btn-outline-dark btn-square"
                              href="/"
                            >
                              <i className="fa fa-shopping-cart"></i>
                            </a>
                            <a
                              className="btn btn-outline-dark btn-square"
                              href="/"
                            >
                              <i className="far fa-heart"></i>
                            </a>
                          </div>
                          <div className="d-flex flex-column text-center py-4">
                            <a
                              className="h6 text-decoration-none text-truncate"
                              href="/"
                            >
                              {product.name.substring(0, 25)}
                            </a>
                            <span className="text-success h6 font-weight-semibold">
                              In Stock
                            </span>
                            <div className="d-flex align-items-center justify-content-center mb-1">
                              <Rating
                                name="read-only"
                                value={product.rating}
                                precision={0.5}
                                readOnly
                              />
                            </div>
                            <div className="d-flex align-items-center justify-content-center mt-2">
                              <h5>Rs{product.price}</h5>
                              <h6 className="text-muted ml-2">
                                <del>Rs{product.oldPrice}</del>
                              </h6>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
