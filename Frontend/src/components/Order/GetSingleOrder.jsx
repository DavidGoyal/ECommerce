import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom'
import { clearErrors, getOrder } from '../../actions/orderActions';
import { useAlert } from 'react-alert';
import Metadata from '../Metadata';
import Loader from '../Loader/Loader'
import { Typography } from '@mui/material';
import "./GetSingleOrder.css"

const GetSingleOrder = () => {
    const params=useParams();
    const dispatch=useDispatch();
    const alert=useAlert();


    const {order,loading,error}=useSelector(state=>state.singleOrder);

    useEffect(() => {
      if(error){
        alert.error(error);
        dispatch(clearErrors());
      }
      dispatch(getOrder(params.id))
    }, [dispatch,params,alert,error])
    
  return (
    <>
    <Metadata title="ECommerce Order Details"/>
    {loading?<Loader/>:
    <>
        <div className="orderDetailsPage">
          <div className="orderDetailsContainer">
            <Typography component="h1">
              Order #{order && order._id}
            </Typography>
            <Typography>Shipping Info</Typography>
            <div className="orderDetailsContainerBox">
              <div>
                <p>Name:</p>
                <span>{order.user && order.user.name}</span>
              </div>
              <div>
                <p>Phone</p>
                <span>{order.shippingInfo && order.shippingInfo.phoneNo}</span>
              </div>
              <div>
                <p>Address</p>
                <span>{order.shippingInfo && `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.country} - ${order.shippingInfo.pinCode}`}</span>
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
                  {
                  order.paymentInfo &&
                  order.paymentInfo.status === "succeeded"
                    ? "PAID"
                    : "NOT PAID"
                  }
                </p>
              </div>
              <div>
                <p>Amount:</p>
                <span>{order.totalPrice && `Rs.${order.totalPrice}`}</span>
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
                  {order.orderStatus&&order.orderStatus}
                </p>
              </div>
            </div>
          </div>


          <div className="orderDetailsCartItems">
            <Typography>Order Items</Typography>
            <div className="orderDetailsCartItemsContainer">
              {order.orderItems &&
                order.orderItems.map((item) => (
                  <div key={item.product}>
                    <img src={item.image} alt="Product" />
                    <Link to={`/product/${item.product}`}>
                      {item.name}
                    </Link>{" "}
                    <span>
                      {item.quantity} X Rs.{item.price} ={" "}
                      <b>Rs.{item.price * item.quantity}</b>
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
    </>
    }
    </>
  )
}

export default GetSingleOrder