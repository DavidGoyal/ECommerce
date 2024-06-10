/* eslint-disable react/no-unescaped-entities */
import { useDispatch, useSelector } from 'react-redux'
import {useAlert} from "react-alert"
import "./MyOrders.css"
import Loader from "../Loader/Loader"
import Metadata from '../Metadata'
import { DataGrid } from '@mui/x-data-grid'
import { Typography } from '@mui/material'
import { useEffect } from 'react'
import { myOrders,clearErrors } from '../../actions/orderActions'
import { Link } from 'react-router-dom'
import LaunchIcon from '@mui/icons-material/Launch';


const MyOrders = () => {
    const dispatch=useDispatch();
    const alert=useAlert();

    const {loading,error,orders}=useSelector((state)=>state.myAllOrders);
    const {userData}=useSelector(state=>state.user);


    const rows=[];
    const columns=[
        {field:"id",headerName:"Order ID",minWidth:200,flex:0.5},
        {field:"status",headerName:"Status",minWidth:150,flex:0.4,
            cellClassName:(params)=>
            {
                return params.row.status==="Delivered"?"greenColor":"redColor";
            }
        },
        {field:"itemQty",headerName:"Item Qty",type:"number",minWidth:150,flex:0.3},
        {field:"amount",headerName:"Amount",type:"number",minWidth:270,flex:0.5},
        {field:"action",headerName:"Actions",type:"number",minWidth:150,flex:0.3,sortable:false,
            renderCell:(params)=>
            <>
                <Link to={`/order/${params.id}`}><LaunchIcon/></Link>
            </>
        },
    ];

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
        alert.error(error);
        dispatch(clearErrors());
      }
      dispatch(myOrders());
    }, [error,dispatch,alert])
    

  return (
    <>
    <Metadata title={`${userData.name}'s Orders`}/>
    {loading?<Loader/>:
    <>
        <div className="myOrdersPage">
            <DataGrid 
                rows={rows}
                columns={columns}
                pageSize={10}
                disableSelectionOnClick
                className='myOrdersTable'
                autoHeight
            />

            <Typography id="myOrdersHeading">{userData.name}'s Orders</Typography>
        </div>
    </>
    }
    </>
  )
}

export default MyOrders