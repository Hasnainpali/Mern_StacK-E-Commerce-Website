import React, { useEffect, useState } from "react";
import { fetchDataFormApi } from "./utility/Api";
import Dialog from "@mui/material/Dialog";

import { Button } from "@mui/material";
import { MdClose } from "react-icons/md";

export default function OrderPage() {
  const [order, setOrder] = useState([]);
  const [orderProduct, setOrderProduct] = useState([]);
  const [isModelopen, setisModelOpen] = useState(false);
  
  const handleClose = () => {
    setisModelOpen(false);
  };

  useEffect(() => {
    window.scrollTo(0,0)
    fetchDataFormApi(`/api/order`).then((res) => {
      setOrder(res);
    });
  }, []);

  const showProducts = (id) =>{
     fetchDataFormApi(`/api/order/${id}`).then((res)=>{
      setisModelOpen(true)
        setOrderProduct(res.productDetail)

     })
  };
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Intl.DateTimeFormat("en-US", options).format(new Date(dateString));
  };


  const handlechange = (e, value) => {
    fetchDataFormApi(`/api/order?page=${value}$perpage=8`).then((res) => {
      setOrder(res);
    });
  };
  return (
    <div className="tableOrder">
      <section className="section">
        <div className="p-3 mb-5">
          <h2 className="hd mb-3"> Orders List</h2>
          <div className="table-responsive tableOrder">
            <table className="table table-striped table-bordered">
              <thead className="thead-dark">
                <tr className="font-weight-bolder" style={{ color: "#000000" }}>
                  <th>Date</th>
                  <th>Payment ID</th>
                  <th>Customer Name</th>
                  <th>Products</th>
                  <th>Order Status</th>
                  <th> Total Amount</th>
                  <th>Address</th>
                  <th>Email</th>
                  <th>User ID</th>
                  <th>Payment Status</th>
                  <th>Payment Type</th>
                  <th>Country</th>
                  <th>City</th>
                </tr>
              </thead>
              <tbody>
                {order?.orderList?.length !== 0 &&
                  order?.orderList?.map((item, index) => {
                    return (
                      <React.Fragment>
                        <tr
                          className=""
                          key={index}
                          style={{ color: "#000000" }}
                        >
                           <td> {formatDate(item.createdAt)} </td>
                          <td> {item.paymentDetails.paymentId} </td>
                          <td className="text-capitalize">
                            {" "}
                            {item.shippingAddress.fullName}{" "}
                          </td>
                          <td>
                            {" "}
                            <span
                              className="font-weight-bold cursor"
                              onClick={()=> showProducts(item._id)}
                            >
                              {" "}
                              Click here and Show Products{" "}
                            </span>
                          </td>
                          <td className="text-capitalize">
                            {" "}
                            {item.status === "Pending" ? (
                              <span className="badge badge-danger p-2 ">
                                {item.status}
                              </span>
                            ) : (
                              <span className="badge badge-success p-2">
                                {item.status}
                              </span>
                            )}{" "}
                          </td>
                          <td> {item.totalAmount} </td>
                          <td>
                            {item.shippingAddress.addressLine1}
                            {/* <td> {item.shippingAddress.addressLine2}</td> */}
                          </td>
                          <td> {item.email}</td>
                          <td> {item.userId}</td>
                          <td className="text-capitalize">
                            {" "}
                            {item.paymentDetails.paymentStatus}
                          </td>
                          <td className="text-capitalize">
                            {" "}
                            {item.paymentDetails.payment_method_type}
                          </td>
                          <td> {item.shippingAddress.country}</td>
                          <td> {item.shippingAddress.city}</td>
                        </tr>
                      </React.Fragment>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </section>
      <Dialog
        open={isModelopen}
        onClose={handleClose}
        className="tableOrder"
      >
        <Button className="close" onClick={handleClose}>
          <MdClose />
        </Button>
        <h4 className="ml-3">OrderList Products</h4>

        <div className="table-responsive tableOrder p-3 ">
          <table className="table table-striped table-bordered tableOrder">
            <thead className="thead-dark">
              <tr>
                <th> ID</th>
                <th> Name</th>
                <th> Image</th>
                <th> Price</th>
                <th> Quantity</th>
                <th> SubTotal</th>
              </tr>
            </thead>
            <tbody>
                {orderProduct?.Length !==0 && orderProduct?.map((item,index)=>{
                  return(
                      <tr>
                         <td> {item.productId} </td>
                         <td> {item.name.substring(0,20)} </td>
                         <td >
                          <div className="img"> <img src={item.image} alt="" />  </div>
                         </td>
                         <td> {item.price} </td>
                         <td> {item.quantity} </td>
                         <td> {item.subTotal} </td>
                         
                      </tr>
                  )
                })}
            </tbody>
          </table>
        </div>
      </Dialog>
    </div>
  );
}
