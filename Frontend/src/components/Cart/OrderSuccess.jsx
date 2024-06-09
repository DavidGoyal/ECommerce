import { Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import './OrderSuccess.css'
import Metadata from '../Metadata'

const OrderSuccess = () => {
  return (
    <>
      <Metadata title="ECommerce Order Success"/>
      <div className="orderSuccess">
          <CheckCircleIcon/>
          <Typography>Your order has been placed successfully</Typography>
          <Link to="/orders">View Orders</Link>
      </div>
    </>
  )
}

export default OrderSuccess