import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import './category.css'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { IoIosArrowBack, IoIosArrowRoundForward } from 'react-icons/io';
import { fetchDataFormApi } from './utility/Api';
import { useContext } from 'react';
import { UserContext } from './Context Api/UserAuthContext';
import ProductBar from './Skeleton/Product.bar'

export default function Category() {
  const {BaseURl} = useContext(UserContext)
  const [categoryData, setCategoryData] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);

    fetchDataFormApi(`/api/categorys`).then((res) => {
      setCategoryData(res);
      setisLoading(false);
    }).catch((error) => {
      console.error("Error fetching category data:", error);
      setisLoading(false);
    });
  }, []);
      
  return (
    <div className="container-fluid categorys">
      <div className="row px-xl-5 py-3">
        <h2 className='ml-3 mb-3 font-weight-bold'>Category</h2>
        <div className="col-lg-12 col-md-12 col-sm-12 ">         
          <Swiper
            spaceBetween={40}
            navigation={true}
            pagination={{
              clickable: true,
            }}
            modules={[Navigation, Pagination]}
            className="mySwiper "
            breakpoints={{
              1024: { slidesPerView: 6 },
              768: { slidesPerView: 3 },
              576: { slidesPerView: 1 },
              375: { sliderPerView: 1 },
            }}
          >
           {isLoading === true ? <ProductBar count={3}/> :
           (
             <>
                  {categoryData?.categoryList?.map((data,index)=>{
              return(
                <SwiperSlide>
            <div className="category product-item bg-light  " key={index} >
              <div className="d-flex flex-column justify-content-center align-items-center product-item position-relative overflow-hidden" onClick={() => navigate(`product/category/${data.id}`)} >
                <img
                  className="img-fluid category-imgs"
                  src={data.images}
                  alt=""
                />

                <div className="text-center py-2">
                  <a className="h6 text-decoration-none text-truncate" href="/">
                    {data.name}
                  </a>
                </div>
              </div>
            </div>
            </SwiperSlide>
              )
            })}
             </>
           )}
          </Swiper>
        </div>
        </div>
      </div>
  );
}
