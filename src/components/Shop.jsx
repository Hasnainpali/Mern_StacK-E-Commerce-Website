import React, { useState, useEffect, useContext, useMemo } from "react";
import "./Shop.css";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "./Context Api/UserAuthContext";
import { fetchDataFormApi } from "./utility/Api";
import { Rating, Slider, Typography } from "@mui/material";
// import { Button, CircularProgress } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import ProductBar from "./Skeleton/Product.bar";

function valuetext(value) {
  return `${value};`
}

export default function Shop() {
  const { searchData, setSearchData } = useContext(UserContext);
  const [catData, setCatData] = useState([]);
  const [productData, setProductData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [catID, setCatID] = useState("");
  const [priceRange, setPriceRange] = useState([0, 50000]);
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setisLoading] = useState(false);

   // Fetch categories
   useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetchDataFormApi(`/api/categorys`);
        setCatData(res);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  // Fetch products
  useEffect(() => {
    setisLoading(true);
    fetchDataFormApi(`/api/products`)
      .then((res) => {
        setProductData(res.productList);
        setFilteredData(res.productList)
        setisLoading(false);
      })
      .catch(() => setisLoading(false));
  }, []);

  // Update category from URL
  useEffect(() => {
    setCatID(id || "All");
  }, [id]);

  // Filter products based on criteria
  const filterData = useMemo(() => {
    let filtered = [...productData];
  
    if (catID !== "All") {
      filtered = filtered.filter((product) => product.catID === catID);
    }
  
    filtered = filtered.filter(
      (product) =>
        product.price >= priceRange[0] && product.price <= priceRange[1]
    );
  
  // Apply search filter if it's available
  if (searchData?.length > 0) {
    const searchFiltered = filtered.filter((product) =>
      searchData.some((searchItem) => searchItem.id === product.id)
    );
    return searchFiltered; // Return only search-filtered data
  }
  
    return filtered;
  }, [productData, catID, priceRange, searchData]);
  
  useEffect(() => {
    setFilteredData(filterData);
  }, [filterData]);

  const handleCategoryChange = (e) => {
    const selectedCatID = e.target.value;
    setCatID(selectedCatID);
    setSearchData([])
    navigate(selectedCatID === "All" ? `/product`: `/product/${selectedCatID}`);
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
              value={catID}
              onChange={handleCategoryChange}
            >
              <FormControlLabel value="All" control={<Radio />} label="All"/>
              {catData?.categoryList?.length > 0 &&
                catData.categoryList.map((item) => (
                  <FormControlLabel
                    key={item.id}
                    value={item.id}
                    control={<Radio/>}
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
              onChange={(e, newValue) => setPriceRange(newValue)}
              valueLabelDisplay="auto"
              getAriaValueText={valuetext}
              min={0}
              max={50000}
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
            <div className="col-12 pb-1"></div>
            <div className="row justify-content-center pb-1 pl-3">
              {isLoading === true ? (
                <ProductBar count={6} />
              ) : (
                <>
                  {filteredData?.map((product) => (
                    <div
                      className="d-flex flex-wrap ml-0 ml-md-3 product-item bg-light mb-4"
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