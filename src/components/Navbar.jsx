import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./Navbar.css";
import { CartContext } from "./Context Api/ShopContext";
import { fetchDataFormApi } from "./utility/Api";
import { UserContext } from "./Context Api/UserAuthContext";

export default function Navbar() {
  const {setSelected} = useContext(UserContext)
  const {id} = useParams()
  const [isOpen, setisOpen] = useState(false);
  const { cartItem,setCartItem } = useContext(CartContext);
  const [catData, setCatData] = useState([]);

  const handleToggle = () => {
    setisOpen(!isOpen);
  };
  const closeMenu = () => {
    setisOpen(false);
  };
  
  //  const selectCat = (cat) =>{
  //    setSelected(cat)
  //  }

  useEffect(() => {
    fetchDataFormApi(`/api/categorys`).then((res) => {
      setCatData(res);
    });
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.userId) {
      fetchDataFormApi(`/api/cart?userId=${user?.userId}`).then((res) => {
        setCartItem(res.length);
       });
    } 
  }, []);


  return (
    <div className="container-fluid bg-dark mb-30" id="bact to top">
      <div className="row px-xl-5">
        <div className="col-lg-3 d-none d-lg-block">
          <a
            className="btn d-flex align-items-center justify-content-between bg-primary w-100"
            data-toggle="collapse"
            href="#navbar-vertical"
            style={{ height: "65px", padding: " 0 30px" }}

          >
            <h6 className="text-dark m-0">
              <i className="fa fa-bars mr-2"></i>Categories
            </h6>
            <i className="fa fa-angle-down text-dark"></i>
          </a>
          <nav
            className={`collapse position-absolute navbar navbar-vertical navbar-light align-items-start p-0 bg-light `}
            id="navbar-vertical"
            style={{ width: "calc(100% - 30px)", zIndex: 999 }}
          >
            <div className="navbar-nav w-100">
            
              {catData?.categoryList?.length !== 0 &&
                catData?.categoryList?.map((item, index) => {
                  return (
                    <div key={index} >
                      <Link to={`product/category/${item.id}`} className="nav-item nav-link" onClick={closeMenu}>
                         {item.name}
                      </Link>
                    </div>
                  );
                })}
            </div>
          </nav>
        </div>
        <div className="col-lg-9">
          <nav className="navbar navbar-expand-lg bg-dark navbar-dark py-3 py-lg-0 px-0">
            <div className="container">
              <a
                href="/"
                className="text-decoration-none m-auto d-block d-lg-none "
              >
                <span className="h1 text-uppercase text-dark bg-light px-2">
                  Multi
                </span>
                <span className="h1 text-uppercase text-light bg-primary px-2 ml-n1">
                  Shop
                </span>
              </a>
              <button
                type="button"
                className="navbar-toggler"
                onClick={handleToggle}
              >
                <span className="navbar-toggler-icon"></span>
              </button>

              <div
                className={`collapse navbar-collapse justify-content-between ${
                  isOpen ? "show" : ""
                }`}
                id="navbarCollapse"
              >
                <div className="navbar-nav mr-auto py-0">
                  <Link
                    to="/"
                    className="nav-item nav-link active"
                    onClick={closeMenu}
                  >
                    Home
                  </Link>
                  <Link
                    to="/product"
                    className="nav-item nav-link"
                    onClick={closeMenu}
                  >
                    Shop
                  </Link>
                  {/* <Link
                    to="/product/detail"
                    className="nav-item nav-link"
                    onClick={closeMenu}
                  >
                    Shop Detail
                  </Link> */}
                  <div className="nav-item dropdown">
                    <Link
                      to="/"
                      className="nav-link dropdown-toggle"
                      data-toggle="dropdown"
                    >
                      Pages <i className="fa fa-angle-down mt-1"></i>
                    </Link>
                    <div className="dropdown-menu bg-primary rounded-0 border-0 m-0">
                      <Link
                        to="/shopping-cart"
                        className="dropdown-item"
                        onClick={closeMenu}
                      >
                        Shopping Cart
                      </Link>
                      <Link
                        to="/checkout"
                        className="dropdown-item"
                        onClick={closeMenu}
                      >
                        Checkout
                      </Link>
                    </div>
                  </div>
                  <Link
                    to="/contact"
                    className="nav-item nav-link"
                    onClick={closeMenu}
                  >
                    Contact
                  </Link>
                </div>
              </div>
              <div className="navbar-nav ml-auto py-0 d-none d-lg-block mobile-visible">
                <Link to="/shopping-cart" className="btn px-0 ml-3">
                  <i className="fas fa-shopping-cart text-primary"></i>
                  <span
                    className="badge text-secondary border border-secondary rounded-circle"
                    style={{ paddingBottom: "2px" }}
                  >
                    {cartItem? cartItem :"0"}
                  </span>
                </Link>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}
