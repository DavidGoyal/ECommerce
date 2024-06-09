import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import "./UpdatePassword.css"
import { useEffect, useState } from "react";
import { clearErrors, updatePassword } from '../../actions/userActions';
import {useAlert} from "react-alert" 
import Loader from '../Loader/Loader';
import { UPDATE_PASSWORD_RESET } from '../../constants/userConstants';
import Metadata from '../Metadata';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import LockOpenIcon from '@mui/icons-material/LockOpen'
import LockIcon from '@mui/icons-material/Lock'

const UpdatePassword = () => {

    const dispatch=useDispatch();
    const alert=useAlert();
    const navigate=useNavigate();

    const [oldPassword,setOldPassword]=useState("")
    const [newPassword,setNewPassword]=useState("")
    const [confirmPassword,setConfirmPassword]=useState("")

    const {loading,error,isUpdated}=useSelector(state=>state.profile)

    const UpdatePasswordSubmit=(e)=>{
        e.preventDefault();
        const myForm=new FormData();
        myForm.set("oldPassword",oldPassword);
        myForm.set("newPassword", newPassword);
        myForm.set("confirmPassword", confirmPassword);
        dispatch(updatePassword(myForm))  
    }



    useEffect(() => {

        if(error){
            alert.error(error);
            dispatch(clearErrors());
        }

        if(isUpdated){
            alert.success("Password Updated Successfully");
            navigate("/account");
            dispatch({
                type:UPDATE_PASSWORD_RESET,
            })
        }
    }, [error,dispatch,alert,isUpdated,navigate])

  return (
    <>
    <Metadata title="ECommerce Update password"/>
    {loading?<Loader/>:
        <>
            <div className="UpdatePasswordContainer">
                <div className="UpdatePasswordBox">
                    <h2 className='updatePasswordHeading'>Update Password</h2>
                    <form encType='multipart/form-data' className="updatePassword" onSubmit={UpdatePasswordSubmit}>
                        <div>
                            <VpnKeyIcon/>
                            <input type="password" placeholder="Old Password" required name="oldPassword" value={oldPassword} onChange={(e)=>setOldPassword(e.target.value)} />
                        </div>
                        <div>
                            <LockOpenIcon/>
                            <input type="password" placeholder="New Password" required name="newPassword" value={newPassword} onChange={(e)=>setNewPassword(e.target.value)}/>
                        </div>
                        <div>
                            <LockIcon/>
                            <input type="password" placeholder="Confirm Password" required name="confirmPassword" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}/>
                        </div>
                        <input type="submit" value="Update Password" className="updatePasswordBtn" />
                    </form>
                </div>
            </div>
        </>
    }
    </>
  )
}

export default UpdatePassword