import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useAlert } from 'react-alert'
import Loader from "../Loader/Loader"
import { DELETE_USER_RESET } from '../../constants/userConstants'
import { Link } from 'react-router-dom'
import { DataGrid } from '@mui/x-data-grid'
import { Button } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import Sidebar from './Sidebar'
import './ProductList.css'
import "./Dashboard.css"
import { deleteAdminUser, getAllAdminUsers, clearErrors } from '../../actions/userActions'
import Metadata from '../Metadata'


const UsersList = () => {
    const {users,error,loading}=useSelector(state=>state.allUsers)
    const {error:deleteError,isDeleted,message}=useSelector(state=>state.profile)
    const alert=useAlert();
    const dispatch=useDispatch();
    const navigate=useNavigate();


    const deleteUserHandler=(id)=>{
        dispatch(deleteAdminUser(id));
    }



    const columns=[
        {field:"id",headerName:"User ID",minWidth:200,flex:0.8},
        {field:"email",headerName:"Email",minWidth:350,flex:1},
        {field:"name",headerName:"Name",minWidth:200,flex:0.5},
        {field:"role",headerName:"Role",minWidth:270,flex:0.3,
            cellClassName:(params)=>
                {
                    return params.role==="admin"?"greenColor":"redColor";
                }
        },
        {field:"actions",headerName:"Actions",type:"number",minWidth:150,flex:0.3,sortable:false,renderCell:(params)=>{
            return(
                <>
                <Link to={`/admin/user/${params.id}`}>
                    <EditIcon/>
                </Link>
                <Button onClick={()=>deleteUserHandler(params.id)}>
                    <DeleteIcon/>
                </Button>
                </>
            )
        }
        }
    ]

    const rows=[]


    users&&users.forEach((item)=>{
        rows.push({
            id:item._id,
            email:item.email,
            role:item.role,
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
      if(isDeleted){
        alert.success(message)
        navigate("/admin/users")
        dispatch({type:DELETE_USER_RESET})
      }
      dispatch(getAllAdminUsers());
    }, [error,alert,dispatch,deleteError,isDeleted,navigate,message])
    
  return (
    <>
    <Metadata title="ECommerce Admin Users List"/>
    {loading?<Loader/>:
    <>
        <div className="dashboard">
            <Sidebar/>
            <div className="productListContainer">
                <h1 id='productListHeading'>ALL USERS</h1>

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

export default UsersList