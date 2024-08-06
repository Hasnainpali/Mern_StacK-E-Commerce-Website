import React, { useContext, useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { fetchDataFormApi } from "./utility/Api";
import './Checkout.css';
import { UserContext } from "./Context Api/UserAuthContext";

export default function Checkout() {
  const [cartData, setCartData] = useState([]);
  const {setAlertBox} = useContext(UserContext)
  const [formFields, setFormFields] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNo: "",
    addressLine1: "",
    addressLine2: "",
    country: "",
    city: "",
    state: "",
    zipCode: "",
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    fetchDataFormApi(`/api/cart?userId=${user?.userId}`).then((res) => {
      setCartData(res);
    });
  }, []);

  const onChangeInput = (e) => {
    setFormFields(() => ({
      ...formFields,
      [e.target.name]: e.target.value,
    }));
  };

  const checkout = (e) => {
    e.preventDefault();
    console.log(formFields);
    if(formFields.firstName === "" || formFields.lastName === "" || formFields.addressLine2 === "" || formFields.addressLine2 === "" || formFields.country === "" || formFields.city === "" || formFields.email === "" || formFields.phoneNo === "" || formFields.state === "" || formFields.zipCode === ""){
        setAlertBox({
            open:true,
            error:true,
            msg:"Please fill all the fields"
        })
        return false
    }

    const addressInfo = {
        name:formFields.firstName + formFields.lastName,
        phoneNumber:formFields.phoneNo,
        address: formFields.addressLine1 + formFields.addressLine2,
        zipCode: formFields.zipCode,
        date: new Date().toLocaleString(
            "en-US",
            {
                month:"short",
                day:"2-digit",
                year:"numeric"

            }
        )
    }
  };

  return (
    <div class="container-fluid" id="checkout">
      <div class="row px-xl-5">
        <div class="col-12">
          <nav class="breadcrumb bg-light mb-30">
            <a class="breadcrumb-item text-dark" href="/">
              Home
            </a>
            <a class="breadcrumb-item text-dark" href="/">
              Shop
            </a>
            <span class="breadcrumb-item active">Checkout</span>
          </nav>
        </div>
      </div>
      <div class="row px-xl-5">
        <div class="col-lg-8">
          <h5 class="section-title position-relative text-uppercase mb-3">
            <span class="bg-secondary pr-3">Billing Address</span>
          </h5>
          <div class="bg-light p-30 mb-5">
            <div class="row">
              <div class="col-md-6 form-group">
                <TextField
                  label="First Name "
                  variant="outlined"
                  className="w-100"
                  size="small"
                  name="firstName"
                  onChange={onChangeInput}
                />
              </div>
              <div class="col-md-6 form-group">
                <TextField
                  label="Last Name"
                  variant="outlined"
                  className="w-100"
                  size="small"
                  name="lastName"
                  onChange={onChangeInput}
                />
              </div>
              <div class="col-md-6 form-group">
                <TextField
                  label="Email"
                  variant="outlined"
                  className="w-100"
                  size="small"
                  name="email"
                  onChange={onChangeInput}
                />
              </div>
              <div class="col-md-6 form-group">
                <TextField
                  label="Mobile No"
                  variant="outlined"
                  className="w-100"
                  size="small"
                  name="phoneNo"
                  onChange={onChangeInput}
                />
              </div>
              <div class="col-md-6 form-group">
                <TextField
                  label="Address Line 1"
                  variant="outlined"
                  className="w-100"
                  size="small"
                  name="addressLine1"
                  onChange={onChangeInput}
                />
              </div>
              <div class="col-md-6 form-group">
                <TextField
                  label="Address Line 2"
                  variant="outlined"
                  className="w-100"
                  size="small"
                  name="addressLine2"
                  onChange={onChangeInput}
                />
              </div>
              <div class="col-md-6 form-group">
                <TextField
                  label="Country"
                  variant="outlined"
                  className="w-100"
                  size="small"
                  name="country"
                  onChange={onChangeInput}
                />
              </div>
              <div class="col-md-6 form-group">
                <TextField
                  label="City"
                  variant="outlined"
                  className="w-100"
                  size="small"
                  name="city"
                  onChange={onChangeInput}
                />
              </div>
              <div class="col-md-6 form-group">
                <TextField
                  label="State/Country"
                  variant="outlined"
                  className="w-100"
                  size="small"
                  name="state"
                  onChange={onChangeInput}
                />
              </div>
              <div class="col-md-6 form-group">
                <TextField
                  label="Zip Code"
                  variant="outlined"
                  className="w-100"
                  size="small"
                  name="zipCode"
                  onChange={onChangeInput}
                />
              </div>
              {/* <div class="col-md-12 form-group">
                <div class="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    class="custom-control-input"
                    id="newaccount"
                  />
                  <label class="custom-control-label" for="newaccount">
                    Create an account
                  </label>
                </div>
              </div> */}
              <div class="col-md-12">
                <div class="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    class="custom-control-input"
                    id="shipto"
                  />
                  <label
                    class="custom-control-label"
                    for="shipto"
                    data-toggle="collapse"
                    data-target="#shipping-address"
                  >
                    Ship to different address
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div class="collapse mb-5" id="shipping-address">
            <h5 class="section-title position-relative text-uppercase mb-3">
              <span class="bg-secondary pr-3">Shipping Address</span>
            </h5>
            <div class="bg-light p-30">
              <div class="row">
                <div class="col-md-6 form-group">
                  <TextField
                    label="First Name "
                    variant="outlined"
                    className="w-100"
                    size="small"
                    name="firstName"
                    onChange={onChangeInput}
                  />
                </div>
                <div class="col-md-6 form-group">
                  <TextField
                    label="Last Name"
                    variant="outlined"
                    className="w-100"
                    size="small"
                    name="lastName"
                    onChange={onChangeInput}
                  />
                </div>
                <div class="col-md-6 form-group">
                  <TextField
                    label="Email"
                    variant="outlined"
                    className="w-100"
                    size="small"
                    name="email"
                    onChange={onChangeInput}
                  />
                </div>
                <div class="col-md-6 form-group">
                  <TextField
                    label="Mobile No"
                    variant="outlined"
                    className="w-100"
                    size="small"
                    name="phoneNo"
                    onChange={onChangeInput}
                  />
                </div>
                <div class="col-md-6 form-group">
                  <TextField
                    label="Address Line 1"
                    variant="outlined"
                    className="w-100"
                    size="small"
                    name="addressLine1"
                    onChange={onChangeInput}
                  />
                </div>
                <div class="col-md-6 form-group">
                  <TextField
                    label="Address Line 2"
                    variant="outlined"
                    className="w-100"
                    size="small"
                    name="addressLine2"
                    onChange={onChangeInput}
                  />
                </div>
                <div class="col-md-6 form-group">
                  <TextField
                    label="Country"
                    variant="outlined"
                    className="w-100"
                    size="small"
                    name="country"
                    onChange={onChangeInput}
                  />
                </div>
                <div class="col-md-6 form-group">
                  <TextField
                    label="City"
                    variant="outlined"
                    className="w-100"
                    size="small"
                    name="city"
                    onChange={onChangeInput}
                  />
                </div>
                <div class="col-md-6 form-group">
                  <TextField
                    label="State/Country"
                    variant="outlined"
                    className="w-100"
                    size="small"
                    name="state"
                    onChange={onChangeInput}
                  />
                </div>
                <div class="col-md-6 form-group">
                  <TextField
                    label="Zip Code"
                    variant="outlined"
                    className="w-100"
                    size="small"
                    name="zipCode"
                    onChange={onChangeInput}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-4">
          <h5 class="section-title position-relative text-uppercase mb-3">
            <span class="bg-secondary pr-3">Order Total</span>
          </h5>
          <div className="bg-light p-30 mb-5">
            <table className="table custom-table">
              <thead>
                <tr>
                  <th>Products</th>
                  <th>SubTotal</th>
                </tr>
              </thead>
              <tbody>
                {cartData.length !== 0 &&
                  cartData.map((item, index) => (
                    <tr key={index}>
                      <td>{item.productTitle.substring(0, 10)} x <span className=""> {item.quantity}</span></td>
                      <td>RS {item.subTotal}</td>
                    </tr>
                  ))}
              </tbody>
              <tfoot style={{borderTop:'1px solid gray'}}>
                <tr>
                  <th>subTotal</th>
                  <td> RS {cartData.length !== 0 && cartData.map(item => parseInt(item.price) * (item.quantity)).reduce((total,value)=> total + value, 0 )}</td> 
                </tr>
                  {/* <tr>
                   <th>Total</th>
                    <td>$160</td>
                  </tr> */}
             
              </tfoot>
            </table>
          </div>

          <div class="mb-5">
            <h5 class="section-title position-relative text-uppercase mb-3">
              <span class="bg-secondary pr-3">Payment</span>
            </h5>
            <div class="bg-light p-30">
              <div class="form-group">
                <div class="custom-control custom-radio">
                  <input
                    type="radio"
                    class="custom-control-input"
                    name="payment"
                    id="paypal"
                  />
                  <label class="custom-control-label" for="paypal">
                    Paypal
                  </label>
                </div>
              </div>
              <div class="form-group">
                <div class="custom-control custom-radio">
                  <input
                    type="radio"
                    class="custom-control-input"
                    name="payment"
                    id="directcheck"
                  />
                  <label class="custom-control-label" for="directcheck">
                    Direct Check
                  </label>
                </div>
              </div>
              <div class="form-group mb-4">
                <div class="custom-control custom-radio">
                  <input
                    type="radio"
                    class="custom-control-input"
                    name="payment"
                    id="banktransfer"
                  />
                  <label class="custom-control-label" for="banktransfer">
                    Bank Transfer
                  </label>
                </div>
              </div>
              <button
                onClick={checkout}
                class="btn btn-block btn-primary font-weight-bold py-3"
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
