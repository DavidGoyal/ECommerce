import { useNavigate } from 'react-router-dom'
import CheckOutSteps from './CheckOutSteps'
import Metadata from '../Metadata'
import "./ConfirmOrder.css"
import { useSelector } from 'react-redux'
import { Typography } from '@mui/material'
import { Link } from 'react-router-dom'

const ConfirmOrder = () => {
    const {shippingInfo,cartItems}=useSelector(state=>state.cart)
    const {userData}=useSelector(state=>state.user)
    const navigate=useNavigate();


    const subtotal=cartItems.reduce((acc,item)=>acc+item.quantity*item.price,0)

    const shippingCharges=subtotal>1000?0:200;

    const gst=Number((subtotal*0.18).toFixed(2));

    const totalPrice=Number(subtotal+shippingCharges+gst);

    const proceedToPayment=()=>{
        const data={
            subtotal,
            shippingCharges,
            gst,
            totalPrice
        }
        sessionStorage.setItem("orderInfo",JSON.stringify(data));
        navigate("/process/payment");
    }

  return (
    <>
    <Metadata title="ECommerce Confirm Order"/>
    <CheckOutSteps activeStep={1}/>
    <div className="confirmOrderPage">
        <div>

            <div className="confirmShippingArea">
                <Typography>Shipping Info</Typography>
                <div className="confirmShippingAreaBox">
                    <div>
                        <p>Name:</p>
                        <span>{userData.name}</span>
                    </div>
                    <div>
                        <p>Phone:</p>
                        <span>{shippingInfo.phoneNo}</span>
                    </div>
                    <div>
                        <p>Address:</p>
                        <span>{`${shippingInfo.address},${shippingInfo.city},${shippingInfo.state},${shippingInfo.pinCode},${shippingInfo.country}`}</span>
                    </div>
                </div>
            </div>

            <div className="confirmCartItems">
                <Typography>Your Cart Items:</Typography>
                <div className="confirmCartItemsContainer">
                    {cartItems && cartItems.map((item)=>(
                        <div key={item.product}>
                            <img src={item.image} alt="Product" />
                            <Link to={`/product/${item.product}`}>
                                <p>{item.name}</p>
                            </Link>
                            <span>{`₹${item.price} X ${item.quantity} = ₹${item.price*item.quantity}`}</span>
                        </div>
                    ))}
                </div>
            </div>

        </div>

        <div>
            <div className="orderSummary">
                <Typography>Order Summary</Typography>
                <div>
                    <div>
                        <p>Subtotal:</p>
                        <span>₹{subtotal}</span>
                    </div>
                    <div>
                        <p>Shipping Charges:</p>
                        <span>₹{shippingCharges}</span>
                    </div>
                    <div>
                        <p>GST:</p>
                        <span>₹{gst}</span>
                    </div>
                </div>

                <div className="orderSummaryTotal">
                    <p><b>Total:</b></p>
                    <span>₹{totalPrice}</span>
                </div>

                <button onClick={proceedToPayment}>Proceed To Payment</button>

            </div>
        </div>


    </div>
    </>
  )
}

export default ConfirmOrder