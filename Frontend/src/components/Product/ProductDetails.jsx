import Carousel from 'react-material-ui-carousel'
import "./ProductDetails.css"
import {useSelector,useDispatch} from "react-redux"
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { clearErrors, getProductDetails, addReview } from '../../actions/productActions'
import { addToCart } from '../../actions/cartActions'
import Loader from '../Loader/Loader'
import {useAlert} from "react-alert"
import ReviewCard from './ReviewCard'
import Metadata from '../Metadata'
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material'
import { Rating } from '@mui/material'
import { NEW_REVIEW_RESET } from '../../constants/productConstants'


const ProductDetails = () => {
    const alert=useAlert();
    const params=useParams();
    const dispatch=useDispatch();

    const {product,loading,error}=useSelector(state=>state.productDetails)
    const {success,error:reviewError}=useSelector(state=>state.newReview)

    const [quantity,setQuantity]=useState(1)
    const [open,setOpen]=useState(false)
    const [rating,setRating]=useState(0)
    const [comment,setComment]=useState("")


    const increment=()=>{
        if(product.stock<=quantity)return;
        setQuantity(quantity+1)
    }

    const decrement=()=>{
        if(quantity<=1)return;
        setQuantity(quantity-1)
    }

    const AddToCart=()=>{
        if(product.stock<1){
            alert.error("Item Out Of Stock");
            return;
        }
        dispatch(addToCart(params.id,quantity))
        alert.success("Item Added To Cart")
    }

    const submitReviewToggle=()=>{
        open?setOpen(false):setOpen(true)
    }

    const reviewSubmitHandler=()=>{
        const myForm=new FormData();

        myForm.set("rating",rating);
        myForm.set("comments",comment);
        myForm.set("productId",params.id);

        dispatch(addReview(myForm))

        setOpen(false)
    }

    useEffect(() => {
        if(error){
            alert.error(error);
            dispatch(clearErrors());
        }

        if(reviewError){
            alert.error(reviewError);
            dispatch(clearErrors());
        }

        if(success){
            alert.success("Review Submitted Successfully")
            dispatch({type:NEW_REVIEW_RESET})
        }

      dispatch(getProductDetails(params.id))
    }, [dispatch,params.id,alert,error,reviewError,success])


    const options = {
        size:"large",
        value: product.ratings,
        readOnly: true,
        precision:0.5,
    };
    
  return (
    <>
    <Metadata title = {`${product.name}`} />

    {loading?<Loader/>:
    <>
    
        <div className="ProductDetails">

            <div>
                <Carousel navButtonsAlwaysInvisible >
                    {product.images && product.images.length > 0 ? (
                        product.images.map((item, i) => (
                            <img className='carouselImage' key={i} src={item.url} alt={`${i} Slide`} />
                        ))
                    ) : (
                        <p>No images available</p>
                    )}
                </Carousel>
            </div>

            <div>
                <div className="detailsBlock-1">
                    <h2>{product.name}</h2>
                    <p>Product # {product._id}</p>
                </div>

                <div className="detailsBlock-2">
                    <Rating {...options} /> 
                    <span className='.detailsBlock-2-span'>({product.noOfReviews} Reviews)</span>
                </div>

                <div className="detailsBlock-3">
                    <h1>{`₹${product.price}`}</h1>
                    <div className="detailsBlock-3-1">
                        <div className="detailsBlock-3-1-1">
                            <button onClick={decrement}>-</button>
                            <input type="number" value={quantity} readOnly />
                            <button onClick={increment}>+</button>
                        </div>
                        <button onClick={AddToCart}>Add to Cart</button>
                    </div>
                    <p>
                        Status:{" "}
                        <b className={product.stock < 1 ? "redColor" : "greenColor"}>
                            {product.stock < 1 ? "OutOfStock" : "InStock"}
                        </b>
                    </p>
                </div>

                <div className="detailsBlock-4">
                    Description: <p>{product.description}</p>
                </div>

                <button onClick={submitReviewToggle} className='submitReview'>Submit Review</button>
            </div>
        </div>


        <h3 className='ReviewsHeading'>REVIEWS</h3>



        <Dialog
            aria-labelledby='simple-dialog-title'
            open={open}
            onClose={submitReviewToggle}
        >
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className='submitDialog'>
                <Rating
                    onChange={(e)=>setRating(e.target.value)}
                    value={rating}
                    size="large"
                />

                <textarea
                    className='submitDialogTextArea'
                    cols="30"
                    rows="5"
                    value={comment}
                    onChange={(e)=>setComment(e.target.value)}
                ></textarea>

            </DialogContent>

            <DialogActions>
                <Button onClick={submitReviewToggle} color='secondary'>Cancel</Button>
                <Button onClick={reviewSubmitHandler} color='primary'>Submit</Button>
            </DialogActions>
        </Dialog>



        {product.reviews&&product.reviews[0]?(
            <div className="reviews">
                {product.reviews&&product.reviews.map((review)=><ReviewCard key={review._id} review={review}/>)}
            </div>
        ):<p className='noReviews'>No Reviews Yet</p>}
    </>
    }
    </>
  )
}

export default ProductDetails