import { useNavigate, useParams, Link } from "react-router-dom";
import Metadata from "../Metadata";
import "../Cart/ConfirmOrder.css";
import { useDispatch, useSelector } from "react-redux";
import { Typography } from "@mui/material";
import Sidebar from "./Sidebar";
import {
  clearErrors,
  getOrder,
  updateAdminOrder,
} from "../../actions/orderActions";
import { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import Loader from "../Loader/Loader";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import { Button } from "@mui/material";
import { UPDATE_ORDER_RESET } from "../../constants/orderConstants";
import "./UpdateOrder.css";

const UpdateOrder = () => {
  const { order, loading, error } = useSelector((state) => state.singleOrder);
  const { error: updateError, success } = useSelector(
    (state) => state.adminOrder
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const alert = useAlert();

  const [status, setStatus] = useState("");

  const processOrder = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("status", status);

    dispatch(updateAdminOrder(params.id, myForm));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }
    if (success) {
      alert.success("Order Updated Successfully");
      navigate("/admin/orders");
      dispatch({ type: UPDATE_ORDER_RESET });
    }
    dispatch(getOrder(params.id));
  }, [dispatch, params, alert, error, success, updateError, navigate]);

  return (
    <>
      <Metadata title="ECommerce Admin Process Order" />
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="dashboard">
            <Sidebar />

            <div className="newProductContainer">
              <div className="confirmOrderPage" style={{display:order.orderStatus==="Delivered"?"block":"grid"}}>
                <div>
                  <div className="confirmShippingArea">
                    <Typography>Shipping Info</Typography>
                    <div className="orderDetailsContainerBox">
                      <div>
                        <p>Name:</p>
                        <span>{order.user && order.user.name}</span>
                      </div>
                      <div>
                        <p>Phone</p>
                        <span>
                          {order.shippingInfo && order.shippingInfo.phoneNo}
                        </span>
                      </div>
                      <div>
                        <p>Address</p>
                        <span>
                          {order &&
                            order.shippingInfo &&
                            `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.country} - ${order.shippingInfo.pinCode}`}
                        </span>
                      </div>
                    </div>

                    <Typography>Payment</Typography>
                    <div className="orderDetailsContainerBox">
                      <div>
                        <p
                          className={
                            order.paymentInfo &&
                            order.paymentInfo.status === "succeeded"
                              ? "greenColor"
                              : "redColor"
                          }
                        >
                          {order.paymentInfo &&
                          order.paymentInfo.status === "succeeded"
                            ? "PAID"
                            : "NOT PAID"}
                        </p>
                      </div>
                      <div>
                        <p>Amount:</p>
                        <span>
                          {order.totalPrice && `Rs.${order.totalPrice}`}
                        </span>
                      </div>
                    </div>

                    <Typography>Order Status</Typography>
                    <div className="orderDetailsContainerBox">
                      <div>
                        <p
                          className={
                            order.orderStatus &&
                            order.orderStatus === "Delivered"
                              ? "greenColor"
                              : "redColor"
                          }
                        >
                          {order.orderStatus && order.orderStatus}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="confirmCartItems">
                    <Typography>Your Cart Items:</Typography>
                    <div className="confirmCartItemsContainer">
                      {order.orderItems &&
                        order.orderItems.map((item) => (
                          <div key={item.product}>
                            <img src={item.image} alt="Product" />
                            <Link to={`/product/${item.product}`}>
                              <p>{item.name}</p>
                            </Link>
                            <span>{`₹${item.price} X ${item.quantity} = ₹${
                              item.price * item.quantity
                            }`}</span>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>

                <div style={{display:order.orderStatus==="Delivered"?"none":"block"}}>
                  <form
                    className="updateOrderForm"
                    encType="multipart/form-data"
                    onSubmit={processOrder}
                  >
                    <h1>Process Order</h1>

                    <div>
                      <AccountTreeIcon />
                      <select onChange={(e) => setStatus(e.target.value)}>
                        <option value="">Choose Category</option>
                        {order.orderStatus === "Processing" && (
                          <option value="Shipped">Shipped</option>
                        )}
                        {order.orderStatus === "Shipped" && (
                          <option value="Delivered">Delivered</option>
                        )}
                      </select>
                    </div>
                    <Button
                      id="createProductBtn"
                      type="submit"
                      disabled={
                        loading ? true : false || status === "" ? true : false
                      }
                      className="updateOrderBtn"
                    >
                      Process
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default UpdateOrder;
