import Navbar from "./components/Navbar";
import TopBar from "./components/TopBar";
import { Route, Routes, useLocation } from "react-router-dom";
import Shop from "./components/Shop";
import Home from "./components/Home";
import ShopDetail from "./components/ShopDetail";
import ShoppingCart from "./components/ShoppingCart";
import Checkout from "./components/Checkout";
import ContactPage from "./components/ContactPage";
import Footer from "./components/Footer";
import { useContext } from "react";
import { UserContext } from "./components/Context Api/UserAuthContext";
import Signin from "./components/Loginandup/Signin";
import "./App.css";
import ProductListing from "./components/ProductListing";
import { useEffect } from "react";
import { Alert } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import Cancel from "./components/Cancel";
import PaymentSuccess from "./components/Success";
import OrderPage from "./components/OrderPage";

function App() {
  const {
    isHeaderFooter,
    setisHeaderFooter,
    setisLogin,
    isLogin,
    setUser,
    alertBox,
    setAlertBox,
  } = useContext(UserContext);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setAlertBox({
      open: false,
    });
  };

  useEffect(() => {
    setisHeaderFooter(true);
    const token = localStorage.getItem("token");
    if (token !== null && token !== "") {
      setisLogin(true);
      const userData = JSON.parse(localStorage.getItem("user"));
      setUser(userData);
    } else {
      setisLogin(false);
    }
  }, [isLogin, setisHeaderFooter]);

  // const location = useLocation();

  // // Define paths where the header and footer should not be shown
  // const noHeaderFooterPaths = ["/signin", "/signup"];

  // const shouldShowHeaderFooter = !noHeaderFooterPaths.includes(
  //   location.pathname
  // );
  return (
    <div>
      <Snackbar
        open={alertBox.open}
        autoHideDuration={5000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={alertBox.error === false ? "success" : "error"}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {alertBox.msg}
        </Alert>
      </Snackbar>
      {isHeaderFooter === true && <TopBar />}
      {isHeaderFooter === true && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="product/category/:id" element={<ProductListing />} />
        <Route path="/product" element={<Shop />} />
        <Route path="/product/detail/:id" element={<ShopDetail />} />
        <Route path="/shopping-cart" element={<ShoppingCart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-page" element={<OrderPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/signin" element={<Signin />} />
        <Route path='/payment/success' element={<PaymentSuccess/>}/>
        <Route path='/cancel' element={<Cancel/>}/>
      </Routes>
      {isHeaderFooter === true && <Footer />}
    </div>
  );
}

export default App;
