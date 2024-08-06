import { useEffect, useState, useRef, useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import "./ProductSlider.css";
import { IoIosArrowBack, IoIosArrowRoundForward, IoMdHeartEmpty } from "react-icons/io";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Link, useNavigate } from "react-router-dom";
import { TfiFullscreen } from "react-icons/tfi";
import { fetchDataFormApi } from "./utility/Api";
import { UserContext } from "./Context Api/UserAuthContext";
import Rating from '@mui/material/Rating';

export default function ProductSlider(props) {
  const { BaseURl } = useContext(UserContext);
  const { title, description, image } = props;
  const [featuredProduct, setFeaturedProduct] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [value, setValue] = useState(0);
  const navigate = useNavigate()
  const handleChange = (e, newValue) => {
    setValue(newValue);
  };

  // const selectCat = (cat) => {
  //   setSelectedCat(cat);
  //   console.log(cat, "cat");
  // };

  const swiperRef = useRef(null);

  useEffect(() => {
        fetchDataFormApi(`/api/products/featured`).then((res)=>{
          setFeaturedProduct(res)
        })
   },[]);

  // useEffect(() => {
  //   fetchDataFormApi(`/api/products?catID=${selectedCat}`).then((res) => {
  //     console.log("Products fetched:", res.productList);
  //     setFilterProduct(res.productList || []);
  //   })
  // }, [selectedCat]);

  useEffect(() => {
    fetchDataFormApi(`/api/categorys`).then((res) => {
      setCategoryData(res);
    })
  }, []);

  const handlePrev = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slidePrev();
    }
  };

  const handleNext = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideNext();
    }
  };

  return (
    <>
      <section className="productbanner px-3">
        <div className="row px-xl-5">
          <div className="col-md-3 d-flex justify-content-center align-items-center">
            <div className="Banner mb-2">
              <img
                src={image}
                alt="banner"
                className="cursor"
              />
            </div>
          </div>
          <div className="col-md-9 productrow mb-4 mt-sm-4">
            <div className="d-flex align-items-center ml-auto">
              <div className="info">
                <h3 className="hd">{title}</h3>
                <p className="text-lightr text-sml">
                  {description}
                </p>
              </div>
              {/* <div className="ml-auto">
                <Tabs
                  value={value}
                  onChange={handleChange}
                  variant="scrollable"
                  scrollButtons="auto"
                  className="filterTabs"
                >
                  {categoryData?.categoryList?.length > 0 ? categoryData.categoryList.map((item, index) => (
                    <Tab
                      key={index}
                      className="item"
                      label={item.name}
                      onClick={() => selectCat(item.name)}
                    />
                  )) : null}
                </Tabs>
              </div> */}
                <button
                type="button"
                class="btn btn-outline-primary ml-auto button  "
              >
                <Link to={'/shop'} className="text-dark text-decoration-none">
                  View All <IoIosArrowRoundForward />
                </Link>
              </button>
            </div>
            <div className="swiper-controls d-flex justify-content-between">
              <button className="prev-btn" onClick={handlePrev}>
                <IoIosArrowBack />
              </button>
              <button className="next-btn" onClick={handleNext}>
                <IoIosArrowRoundForward />
              </button>
              <Swiper
                ref={swiperRef}
                spaceBetween={10}
                navigation={false}
                pagination={{ clickable: true }}
                modules={[Navigation, Pagination]}
                className="mySwiper mt-2"
                breakpoints={{
                  1024: { slidesPerView: 4 },
                  768: { slidesPerView: 3 },
                  576: { slidesPerView: 2 },
                  375: { slidesPerView: 1 },
                }}
              >
                <div className="">
                  {featuredProduct?.length > 0 && featuredProduct?.map((products, index) => (
                    <SwiperSlide key={index}>
                      <div className="product-item bg-light mb-4"  onClick={() => navigate(`/product/detail/${products.id}`)}>
                        <div className="product-img position-relative overflow-hidden">
                          <img
                            className="img-fluid product-imgs"
                            src={products.images[0]}
                            alt={products.name}
                          />
                          {products.discount && (
                            <span className="badelandingpage bg-primary">{products.discount}%</span>
                          )}
                          <div className="product-action1">
                            <a className="btn btn-outline-dark btn-square" href="/">
                              <TfiFullscreen />
                            </a>
                            <a className="btn btn-outline-dark btn-square mt-2" href="/">
                              <IoMdHeartEmpty />
                            </a>
                          </div>
                          <div className="d-flex flex-column text-center py-4">
                            <a className="h6 text-decoration-none text-truncate" href="/">
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
                    </SwiperSlide>
                  ))}
                </div>
              </Swiper>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
