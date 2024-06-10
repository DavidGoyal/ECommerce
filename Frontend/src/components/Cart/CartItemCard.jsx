/* eslint-disable react/prop-types */
import { useDispatch } from 'react-redux'
import "./CartItemCard.css"
import {Link} from "react-router-dom"
import { removeFromCart } from '../../actions/cartActions'

const CartItemCard = ({item}) => {
  const dispatch=useDispatch();

  const RemoveFromCart=(id)=>{
    dispatch(removeFromCart(id));
  }

  return (
    <div className='CartItemCard'>
        <img src={item.image} alt="product" />
        <div>
            <Link to={`/products/${item.product}`}>{item.name}</Link>
            <span>Price: ₹{item.price}</span>
            <p onClick={()=>RemoveFromCart(item.product)}>Remove</p>
        </div>
    </div>
  )
}

export default CartItemCard