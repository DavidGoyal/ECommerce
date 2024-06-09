import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useAlert } from 'react-alert'
import Loader from "../Loader/Loader"
import { getAdminProducts,clearErrors, deleteAdminProduct } from '../../actions/productActions'
import { DELETE_PRODUCT_RESET } from '../../constants/productConstants'
import { Link } from 'react-router-dom'
import { DataGrid } from '@mui/x-data-grid'
import { Button } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import Sidebar from './Sidebar'
import './ProductList.css'
import "./Dashboard.css"
import Metadata from '../Metadata'


const ProductList = () => {
    const {products,error,loading}=useSelector(state=>state.products)
    const {error:deleteError,success}=useSelector(state=>state.newProduct)
    const alert=useAlert();
    const dispatch=useDispatch();
    const navigate=useNavigate();


    const deleteProductHandler=(id)=>{
        dispatch(deleteAdminProduct(id));
    }



    const columns=[
        {field:"id",headerName:"Product ID",minWidth:200,flex:0.5},
        {field:"name",headerName:"Name",minWidth:350,flex:1},
        {field:"stock",headerName:"Stock",type:"number",minWidth:150,flex:0.3},
        {field:"price",headerName:"Price",type:"number",minWidth:270,flex:0.5},
        {field:"actions",headerName:"Actions",type:"number",minWidth:150,flex:0.3,sortable:false,renderCell:(params)=>{
            return(
                <>
                <Link to={`/admin/product/${params.id}`}>
                    <EditIcon/>
                </Link>
                <Button onClick={()=>deleteProductHandler(params.id)}>
                    <DeleteIcon/>
                </Button>
                </>
            )
        }
        }
    ]

    const rows=[]


    products&&products.forEach((item)=>{
        rows.push({
            id:item._id,
            stock:item.stock,
            price:item.price,
            name:item.name
        })
    })


    useEffect(() => {
      if(error){
        alert.error(error)
        dispatch(clearErrors());
      }
      if(deleteError){
        alert.error(deleteError)
        dispatch(clearErrors());
      }
      if(success){
        alert.success("Product Deleted Successfully")
        navigate("/admin/dashboard")
        dispatch({type:DELETE_PRODUCT_RESET})
      }
      dispatch(getAdminProducts());
    }, [error,alert,dispatch,deleteError,success,navigate])
    
  return (
    <>
    <Metadata title="ECommerce Admin Products List"/>
    {loading?<Loader/>:
    <>
        <div className="dashboard">
            <Sidebar/>
            <div className="productListContainer">
                <h1 id='productListHeading'>ALL PRODUCTS</h1>

                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={10}
                    disableSelectionOnClick
                    className='productListTable'
                />

            </div>
        </div>
    </>}
    </>
  )
}

export default ProductList