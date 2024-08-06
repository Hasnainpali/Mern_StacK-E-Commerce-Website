import React, {useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import './TopBar.css'
import { UserContext } from "./Context Api/UserAuthContext";
import Button from "@mui/material/Button";
// import {
//   MdMenuOpen,
//   MdOutlineLightMode,
//   MdOutlineMailOutline,
//   MdOutlineMenu,
// } from "react-icons/md";
import { MdPersonAddAlt1 } from "react-icons/md";
import { MdLogout } from "react-icons/md";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import { FaClipboardCheck } from "react-icons/fa";
import { IoShieldHalfSharp } from "react-icons/io5";
import { FaHeart } from "react-icons/fa";
// import { Link, useNavigate } from "react-router-dom";
// import { UserContext } from "../contextApi/UserAuthContext";

function TopBar() {
  const [isOpenAcc, setisOpenAcc] = useState(false);
  const [isOpenNotification, setisOpenNotification] = useState(false);
  const openAcc = Boolean(isOpenAcc);
  const {isLogin, user, setUser, setAlertBox} = useContext(UserContext)
  // const openNotification = Boolean(isOpenNotification);
  // const {isToggleSidebr, setisToggleSidebr, themeMode, setThemeMode} = useContext(SidebarContext);
  // const {isLogin, user, setAlertBox} = useContext(UserContext);
  const navigate = useNavigate();


  const OpenAccdrop = () => {
    setisOpenAcc(true);
  };
  const closeMyAccdrop = () => {
    setisOpenAcc(false);
  };

  const OpenNotification = () => {
    setisOpenNotification(true);
  };
  const closeNotication = () => {
    setisOpenNotification(false);
  };

  const logout = ()=>{
    localStorage.clear()
    setisOpenAcc(null)
    setTimeout(() => {
     setAlertBox({
       open:true,
       error:false,
       msg:"Logout Successfully"
      })
     navigate('/signin')
    }, 3000);
 }
 
  return (
    <div className="container-fluid">
      <div className="row bg-secondary py-1 px-xl-2">
        <div className="col-lg-6 d-none d-lg-block">
          <div className="d-inline-flex align-items-center h-100">
            <Link className="text-body mr-3" href="">
              About
            </Link>
            <Link className="text-body mr-3" href="">
              Contact
            </Link>
            <Link className="text-body mr-3" href="">
              Help
            </Link>
            <Link className="text-body mr-3" href="">
              FAQs
            </Link>
          </div>
        </div>
        <div className="col-lg-6 d-flex flex-wrap justify-content-between align-items-center text-lg-right d-lg-block">
          <div className="d-inline-flex justify-content-center text-center align-items-center">
            {/* <div className="btn  mr-0 mr-md-3 ">
              {isLogin === false ? <button
                type="button"
                className="btn btn-sm btn-primary btns" 
              >
               <Link to="/signin" className="text-dark  ">
                  Sign in
                </Link>
              </button>
              : 
              <button
                type="button"
                className="btn btn-sm btn-primary btns" 
              >
               <Link to="/signin" className="text-dark  ">
                  Log Out
                </Link>
              </button>}
             
            </div> */}
            <div className="d-md-none d-none d-lg-block">
            {
                isLogin !== true ? <Link to='/signin'><Button className="btn-blue">Sign in</Button></Link> :
                 <>
                   <Button className="myAccWrapper mx-2" onClick={OpenAccdrop}>
                <div className="MyAcc d-flex align-items-center">
                  <div className="user-img">
                    <span className="rounded-circle">
                      {user.name.charAt(0)}
                    </span>
                  </div>
                  <div className="user-info ">
                    <h4> {user.name} </h4>
                    <p className="mb-0">{user.email}</p>
                  </div>
                </div>
              </Button>
              <Menu
                isOpenAcc={isOpenAcc}
                id="account-menu"
                open={openAcc}
                onClose={closeMyAccdrop}
                onClick={closeMyAccdrop}
                PaperProps={{
                    elevation: 0,
                    sx: {
                      overflow: 'visible',
                      filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                      mt: 1,
                      '& .MuiAvatar-root': {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                      '&::before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: 'background.paper',
                        transform: 'translateY(-50%) rotate(45deg)',
                        zIndex: 0,
                      },
                    },
                  }}
          
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                <MenuItem onClick={closeMyAccdrop}>
                  <ListItemIcon>
                    <FaClipboardCheck />
                  </ListItemIcon>
                  My Order
                </MenuItem>
                {/* <MenuItem onClick={closeMyAccdrop}>
                  <ListItemIcon>
                    <FaHeart />
                  </ListItemIcon>
                  My List
                </MenuItem> */}
                <MenuItem onClick={logout}>
                  <ListItemIcon>
                  <MdLogout />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </Menu>
                 </>
              }
            </div>
          </div>
          <div className="d-flex justify-content-md-start align-items-center d-lg-none">
          {
                isLogin !== true ? <Link to='/signin'><Button className="btn-blue">Sign in</Button></Link> :
                 <>
                   <Button className="myAccWrapper mx-2" onClick={OpenAccdrop}>
                <div className="MyAcc d-flex align-items-center">
                  <div className="user-img">
                    <span className="rounded-circle">
                      {user.name.charAt(0)}
                    </span>
                  </div>
                  <div className="user-info ">
                    <h4> {user.name}</h4>
                    <p className="mb-0">{user.email}</p>
                  </div>
                </div>
              </Button>
              <Menu
                isOpenAcc={isOpenAcc}
                id="account-menu"
                open={openAcc}
                onClose={closeMyAccdrop}
                onClick={closeMyAccdrop}
                PaperProps={{
                    elevation: 0,
                    sx: {
                      overflow: 'visible',
                      filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                      mt: 1,
                      '& .MuiAvatar-root': {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                      '&::before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: 'background.paper',
                        transform: 'translateY(-50%) rotate(45deg)',
                        zIndex: 0,
                      },
                    },
                  }}
          
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
               <MenuItem onClick={closeMyAccdrop}>
                  <ListItemIcon>
                    <FaClipboardCheck />
                  </ListItemIcon>
                    <span onClick={() => navigate('/order-page')}>My Order</span>
                </MenuItem>
                {/* <MenuItem onClick={closeMyAccdrop}>
                  <ListItemIcon>
                    <FaHeart />
                  </ListItemIcon>
                  My List
                </MenuItem> */}
                <MenuItem onClick={logout}>
                  <ListItemIcon>
                  <MdLogout />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </Menu>
                 </>
              }
          </div>
        </div>
      </div>
      <div className="row align-items-center bg-light py-3 px-xl-2 d-none d-lg-flex">
        <div className="col-lg-4">
          <a href="/" className="text-decoration-none">
            <span className="h1 text-uppercase text-primary bg-dark px-2">
              Multi
            </span>
            <span className="h1 text-uppercase text-dark bg-primary px-2 ml-n1">
              Shop
            </span>
          </a>
        </div>
        <div className="col-lg-6 col-6 text-left">
          <form action="">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Search for products"
              />
              <div className="input-group-append">
                <span className="input-group-text bg-transparent text-primary">
                  <i className="fa fa-search"></i>
                </span>
              </div>
            </div>
          </form>
        </div>
        <div className="col-lg-2 col-6 text-left ">
      
        </div>
      </div>
    </div>
  );
}

export default TopBar;
