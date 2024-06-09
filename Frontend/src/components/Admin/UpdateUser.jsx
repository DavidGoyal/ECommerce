import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert';
import Loader from '../Loader/Loader';
import Sidebar from "./Sidebar"
import {UPDATE_USER_RESET} from "../../constants/userConstants"
import { Button } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import MailIcon from '@mui/icons-material/Mail';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import "./NewProduct.css"
import { getSingleAdminUser, updateAdminUser, clearErrors } from '../../actions/userActions';
import Metadata from '../Metadata';

const UpdateUser = () => {
    const dispatch=useDispatch()
    const alert=useAlert();
    const navigate=useNavigate();
    const params=useParams();

    const {user,error:fetchError}=useSelector(state=>state.singleUser)

    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [role,setRole]=useState("");


    const {loading,isUpdated,error}=useSelector(state=>state.profile)

    const handleSubmit=(e)=>{
        e.preventDefault();
        const myForm=new FormData();
        myForm.set("role",role);

        dispatch(updateAdminUser(params.id,myForm));
    }


    useEffect(() => {
      if(user && user._id !== params.id){
        dispatch(getSingleAdminUser(params.id))
      }else{
        setName(user.name);
        setEmail(user.email);
        setRole(user.role);
      }
      if(error){
        alert.error(error)
        dispatch(clearErrors())
      }
      if(fetchError){
        alert.error(fetchError)
        dispatch(clearErrors())
      }
      if(isUpdated){
        alert.success("User Updated Successfully")
        navigate("/admin/users")
        dispatch({type:UPDATE_USER_RESET})
      }

    }, [dispatch,alert,error,isUpdated,navigate,fetchError,params.id,user])
    

  return (
    <>
    <Metadata title="ECommerce Admin Update User Role"/>
    {loading?<Loader/>:
    <>
        <div className="dashboard">
            <Sidebar/>

            <div className="newProductContainer">
                <form className="createProductForm" encType="multipart/form-data" onSubmit={handleSubmit}>
                    <h1>Update User</h1>
                    <div>
                        <PersonIcon/>
                        <input type="text" placeholder="Name" value={name} readOnly/>
                    </div>
                    <div>
                        <MailIcon/>
                        <input type="email" placeholder="Email" value={email} readOnly/>
                    </div>
                    <div>
                        <VerifiedUserIcon/>
                        <select value={role} onChange={(e)=>setRole(e.target.value)}>
                            <option value="">Choose Role</option>
                            <option value="admin">Admin</option>
                            <option value="user">User</option>
                        </select>
                    </div>
                    <Button
                        id='createProductBtn'
                        type='submit'
                        disabled={loading ? true : false || role===""?true:false}
                        className='createProductBtn'
                    >Update</Button>
                </form>
            </div>
        </div>
    </>}
    </>
  )
}

export default UpdateUser