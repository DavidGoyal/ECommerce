import { useNavigate } from 'react-router-dom'
import  axios  from 'axios'
import { useEffect, useRef } from 'react'
import Metadata from '../Metadata'
import CheckOutSteps from './CheckOutSteps'
import "./Payment.css"
import { Typography } from '@mui/material'
import CreditCardIcon from '@mui/icons-material/CreditCard'
import EventIcon from '@mui/icons-material/Event'
import { CardCvcElement, CardExpiryElement, CardNumberElement, useElements, useStripe } from '@stripe/react-stripe-js'
import VpnKeyIcon from '@mui/icons-material/VpnKey'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import { newOrder,clearErrors } from '../../actions/orderActions'

const Payment = () => {
    const orderInfo=JSON.parse(sessionStorage.getItem("orderInfo"));
    const dispatch=useDispatch();
    const alert=useAlert();
    const stripe=useStripe();
    const elements=useElements();
    const navigate=useNavigate();

    const {shippingInfo,cartItems}=useSelector(state=>state.cart);
    const {userData}=useSelector(state=>state.user);
    const {error}=useSelector(state=>state.newOrder);

    const amount = Math.round(orderInfo.totalPrice * 100);

    const order={
        shippingInfo,
        orderItems:cartItems,
        itemsPrice:orderInfo.subtotal,
        shippingPrice:orderInfo.shippingCharges,
        taxPrice:orderInfo.gst,
        totalPrice:orderInfo.totalPrice
    }

    const submitHandler=async(e)=>{
        e.preventDefault();
        payBtn.current.disabled=true;
        try {
            const config={
                headers:{
                    "Content-Type":"application/json",
                }
            }
            const {data}=await axios.post("/api/v1/process/payment",{amount:amount},config);
            const client_secret=data.client_secret;

            if(!stripe||!elements) return;
            const result=await stripe.confirmCardPayment(client_secret,{
                payment_method:{
                    card:elements.getElement(CardNumberElement),
                    billing_details:{
                        name:userData.name,
                        email:userData.email,
                        address:{
                            line1:shippingInfo.address,
                            city:shippingInfo.city,
                            state:shippingInfo.state,
                            postal_code:shippingInfo.pinCode,
                            country:shippingInfo.country
                        }
                    }
                }
            });
            if(result.error){
                payBtn.current.disabled=false;
                alert.error(result.error.message);
            }else{
                if(result.paymentIntent.status==="succeeded"){
                    order.paymentInfo={
                        id:result.paymentIntent.id,
                        status:result.paymentIntent.status
                    }
                    dispatch(newOrder(order));
                    alert.success("Payment Successful");
                    navigate("/success");
                }else{
                    alert.error("There is some issue while payment processing");
                }
            }
        } catch (error) {
            payBtn.current.disabled=false;
            alert.error(error.response.data.message);
        }
    }
    const payBtn=useRef(null);

    useEffect(() => {
      if(error){
        alert.error(error);
        dispatch(clearErrors());
      }
    }, [error,alert,dispatch])
    
  return (
    <>
    <Metadata title="ECommerce Payment"/>
    <CheckOutSteps activeStep={2}/>
    <div className="paymentContainer">
        <form className="paymentForm" onSubmit={submitHandler}>
            <Typography>Card Info</Typography>
            <div>
                <CreditCardIcon/>
                <CardNumberElement className='paymentInput'/>
            </div>
            <div>
                <EventIcon/>
                <CardExpiryElement className='paymentInput'/>
            </div>
            <div>
                <VpnKeyIcon/>
                <CardCvcElement className='paymentInput'/>
            </div>
            <input type="submit" value={`Pay - ₹${orderInfo&&orderInfo.totalPrice}`} ref={payBtn} className='paymentFormBtn'/>
        </form>
    </div>
    </>
  )
}

export default Payment