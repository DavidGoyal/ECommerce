import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from "react-router-dom";
import "./ResetPassword.css"
import { useEffect, useState } from "react";
import { clearErrors, resetPassword } from '../../actions/userActions';
import {useAlert} from "react-alert" 
import Loader from '../Loader/Loader';
import Metadata from '../Metadata';
import LockOpenIcon from '@mui/icons-material/LockOpen'
import LockIcon from '@mui/icons-material/Lock'

const ResetPassword = () => {

    const dispatch=useDispatch();
    const alert=useAlert();
    const navigate=useNavigate();
    const params=useParams();

    const [Password,setPassword]=useState("")
    const [confirmPassword,setConfirmPassword]=useState("")

    const {loading,error,success}=useSelector(state=>state.forgotPassword)

    const ResetPasswordSubmit=(e)=>{
        e.preventDefault();
        const myForm=new FormData();
        myForm.set("password",Password);
        myForm.set("confirmPassword", confirmPassword);
        dispatch(resetPassword(params.token,myForm))  
    }



    useEffect(() => {

        if(error){
            alert.error(error);
            dispatch(clearErrors());
        }

        if(success){
            alert.success("Password Resetted Successfully");
            navigate("/login");
        }
    }, [error,dispatch,alert,success,navigate])

  return (
    <>
    <Metadata title="ECommerce Reset password"/>
    {loading?<Loader/>:
        <>
            <div className="ResetPasswordContainer">
                <div className="ResetPasswordBox">
                    <h2 className='resetPasswordHeading'>Reset Password</h2>
                    <form encType='multipart/form-data' className="resetPassword" onSubmit={ResetPasswordSubmit}>
                        <div>
                            <LockOpenIcon/>
                            <input type="password" placeholder="New Password" required name="Password" value={Password} onChange={(e)=>setPassword(e.target.value)}/>
                        </div>
                        <div>
                            <LockIcon/>
                            <input type="password" placeholder="Confirm Password" required name="confirmPassword" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}/>
                        </div>
                        <input type="submit" value="Reset Password" className="resetPasswordBtn" />
                    </form>
                </div>
            </div>
        </>
    }
    </>
  )
}

export default ResetPassword