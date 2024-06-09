import Metadata from "../Metadata"
import { useDispatch, useSelector } from 'react-redux'
import CartItemCard from "./CartItemCard";
import "./Cart.css"
import { addToCart } from "../../actions/cartActions";
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import { Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const Cart = () => {
    const {cartItems}=useSelector(state=>state.cart);
    const dispatch=useDispatch();
    const navigate=useNavigate();

    const increaseQuantity=(id,quantity,stock)=>{
        const newQty=quantity+1;
        if(newQty>stock) return;
        dispatch(addToCart(id,newQty))
    }

    const decreaseQuantity=(id,quantity)=>{
        const newQty=quantity-1;
        if(newQty==0) return;
        dispatch(addToCart(id,newQty))
    }

    const checkoutHandler=()=>{
        navigate("/login?redirect=shipping");
    }

  return (
    <>
        <Metadata title="Ecommerce Shopping Cart"/>
        <div className="cartHeader">
            <h1>My Cart</h1>
        </div>
        {cartItems.length==0?(
            <div className="emptyCart">
                <RemoveShoppingCartIcon/>
                <Typography>No product in cart</Typography>
                <Link to="/products">View Products</Link>
            </div>
        ):
        <div className="cartPage">
            <div className="Header">
                <p>Product</p>
                <p>Quantity</p>
                <p>Subtotal</p>
            </div>
            {cartItems&&cartItems.map((item,index)=>(
                <div className="cartContainer" key={index}>
                    <CartItemCard item={item}/>
                    <div className="cartInput">
                        <button onClick={()=>decreaseQuantity(item.product,item.quantity)}>-</button>
                        <input type="number" value={item.quantity} readOnly />
                        <button onClick={()=>increaseQuantity(item.product,item.quantity,item.stock)}>+</button>
                    </div>
                    <p className="cartSubTotal">₹{item.price*item.quantity}</p>
                </div>
            ))}
            <div className="cartGrossTotal">
                <div>

                </div>
                <div className="cartGrossTotalBox">
                    <p>Gross Total</p>
                    <p>{`₹${cartItems.reduce((acc,item)=>
                         acc+item.quantity*item.price,0
                    )}`}</p>
                </div>
                <div></div>
                <div className="checkOutBtn">
                    <button onClick={checkoutHandler}>Check Out</button>
                </div>
            </div>
        </div>}
    </>
  )
}

export default Cart