import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useAlert } from 'react-alert'
import Loader from "../Loader/Loader"
import { DELETE_ORDER_RESET } from '../../constants/orderConstants'
import { Link } from 'react-router-dom'
import { DataGrid } from '@mui/x-data-grid'
import { Button } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import Sidebar from './Sidebar'
import './ProductList.css'
import "./Dashboard.css"
import { deleteAdminOrder, clearErrors, getAllAdminOrders } from '../../actions/orderActions'
import Metadata from '../Metadata'


const OrderList = () => {
    const {orders,error,loading}=useSelector(state=>state.myAllOrders)
    const {error:deleteError,success}=useSelector(state=>state.adminOrder)
    const alert=useAlert();
    const dispatch=useDispatch();
    const navigate=useNavigate();


    const deleteOrderHandler=(id)=>{
        dispatch(deleteAdminOrder(id));
    }



    const columns=[
        {field:"id",headerName:"Order ID",minWidth:200,flex:0.5},
        {field:"status",headerName:"Status",minWidth:150,flex:0.5,
            cellClassName:(params)=>
            {
                return params.row.status==="Delivered"?"greenColor":"redColor";
            }
        },
        {field:"itemQty",headerName:"Item Qty",type:"number",minWidth:150,flex:0.3},
        {field:"amount",headerName:"Amount",type:"number",minWidth:270,flex:0.5},
        {field:"actions",headerName:"Actions",type:"number",minWidth:150,flex:0.3,sortable:false,renderCell:(params)=>{
            return(
                <>
                <Link to={`/admin/order/${params.id}`}>
                    <EditIcon/>
                </Link>
                <Button onClick={()=>deleteOrderHandler(params.id)}>
                    <DeleteIcon/>
                </Button>
                </>
            )
        }
        }
    ]

    const rows=[]


    orders&&orders.forEach((item)=>{
      rows.push({
          id:item._id,
          status:item.orderStatus,
          itemQty:item.orderItems.length,
          amount:item.totalPrice
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
        alert.success("Order Deleted Successfully")
        navigate("/admin/orders")
        dispatch({type:DELETE_ORDER_RESET})
      }
      dispatch(getAllAdminOrders());
    }, [error,alert,dispatch,deleteError,success,navigate])
    
  return (
    <>
    <Metadata title="ECommerce Admin Orders List"/>
    {loading?<Loader/>:
    <>
        <div className="dashboard">
            <Sidebar/>
            <div className="productListContainer">
                <h1 id='productListHeading'>ALL ORDERS</h1>

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

export default OrderList