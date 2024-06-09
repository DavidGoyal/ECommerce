import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { useAlert } from 'react-alert'
import Loader from "../Loader/Loader"
import { clearErrors, deleteAdminReview, getAllAdminReviews } from '../../actions/productActions'
import { DELETE_REVIEW_RESET } from '../../constants/productConstants'
import { DataGrid } from '@mui/x-data-grid'
import { Button } from '@mui/material'
import Star from '@mui/icons-material/Star'
import DeleteIcon from '@mui/icons-material/Delete'
import Sidebar from './Sidebar'
import './ReviewList.css'
import "./Dashboard.css"
import Metadata from '../Metadata'


const ReviewList = () => {
    const {reviews,error,loading}=useSelector(state=>state.allReviews)
    const {error:deleteError,success}=useSelector(state=>state.deleteReview)
    const alert=useAlert();
    const dispatch=useDispatch();
    const navigate=useNavigate();


    const [productId,setProductId]=useState("")


    const deleteReviewHandler=(id)=>{
        dispatch(deleteAdminReview(id,productId));
    }

    const productReviewsSubmitHandler=(e)=>{
        e.preventDefault();
        dispatch(getAllAdminReviews(productId));
    }


    const columns=[
        {field:"id",headerName:"Review ID",minWidth:200,flex:0.5},
        {field:"user",headerName:"User",minWidth:200,flex:0.6},
        {field:"comment",headerName:"Comment",minWidth:350,flex:1},
        {field:"rating",headerName:"Rating",type:"number",minWidth:180,flex:0.4},
        {field:"actions",headerName:"Actions",type:"number",minWidth:150,flex:0.3,sortable:false,renderCell:(params)=>{
            return(
                <>
                <Button onClick={()=>deleteReviewHandler(params.id)}>
                    <DeleteIcon/>
                </Button>
                </>
            )
        }
        }
    ]

    const rows=[]


    reviews&&reviews.forEach((item)=>{
        rows.push({
            id:item._id,
            user:item.name,
            comment:item.comments,
            rating:item.rating
        })
    })


    useEffect(() => {
      if(productId.length===24){
        dispatch(getAllAdminReviews(productId));
      }
      if(error){
        alert.error(error)
        dispatch(clearErrors());
        setProductId("")
      }
      if(deleteError){
        alert.error(deleteError)
        dispatch(clearErrors());
      }
      if(success){
        alert.success("Review Deleted Successfully")
        navigate("/admin/reviews")
        dispatch({type:DELETE_REVIEW_RESET})
      }
    }, [error,alert,dispatch,deleteError,success,navigate,productId])
    
  return (
    <>
    <Metadata title="ECommerce Admin Reviews List"/>
    {loading?<Loader/>:
    <>
        <div className="dashboard">
            <Sidebar/>
            <div className="productReviewsContainer">
                <form className="productReviewsForm" encType="multipart/form-data" onSubmit={productReviewsSubmitHandler}>
                        <h1 id='productReviewsFormHeading'>ALL REVIEWS</h1>
                        <div>
                            <Star/>
                            <input type="text" placeholder="Product Id" value={productId} onChange={(e)=>setProductId(e.target.value)} />
                        </div>
                </form>

                {reviews && reviews.length>0?
                <DataGrid
                rows={rows}
                columns={columns}
                pageSize={10}
                disableSelectionOnClick
                className='productListTable'
                autoHeight
                />:<h1 className='productReviewsFormHeading'>No Reviews Found</h1>}

            </div>
        </div>
    </>}
    </>
  )
}

export default ReviewList