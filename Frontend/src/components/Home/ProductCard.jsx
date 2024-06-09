/* eslint-disable react/prop-types */
import {Link} from "react-router-dom"
import img1 from "../../assets/top5.jpg"
import { Rating } from '@mui/material';


const ProductCard = ({product}) => {

    const options = {
      value: product.ratings,
      readOnly: true,
      precision:0.5,
  };

  return (
    <Link className="productCard" to={`/product/${product._id}`}>
        <img src={product.images[0].url} alt={product._id} />
        <p>{product.name}</p>
        <div>
            <Rating {...options} /> 
            <span>({product.noOfReviews} Reviews)</span>
        </div>
        <span className="productCardSpan">{`₹${product.price}`}</span>
    </Link>
  )
}

export default ProductCard