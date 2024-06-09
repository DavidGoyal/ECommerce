import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import "./ForgotPassword.css"
import { useEffect, useState } from "react";
import { clearErrors, forgotPassword} from '../../actions/userActions';
import {useAlert} from "react-alert" 
import Loader from '../Loader/Loader';
import Metadata from '../Metadata';
import MailOutlineIcon from '@mui/icons-material/MailOutline';

const UpdatePassword = () => {

    const dispatch=useDispatch();
    const alert=useAlert();
    const navigate=useNavigate();

    const [email,setEmail]=useState("");

    const {loading,error,message}=useSelector(state=>state.forgotPassword)

    const ForgotPasswordSubmit=(e)=>{
        e.preventDefault();
        const myForm=new FormData();
        myForm.set("email",email);
        dispatch(forgotPassword(myForm))  
    }



    useEffect(() => {

        if(error){
            alert.error(error);
            dispatch(clearErrors());
        }
        if(message){
            alert.success(message);
        }

    }, [error,dispatch,alert,message])

  return (
    <>
    <Metadata title="ECommerce Forgot password"/>
    {loading?<Loader/>:
        <>
            <div className="ForgotPasswordContainer">
                <div className="ForgotPasswordBox">
                    <h2 className='forgotPasswordHeading'>Forgot Password</h2>
                    <h4 className='Heading'>Enter your email and we'll send you a link to reset your password</h4>
                    <form encType='multipart/form-data' className="forgotPassword" onSubmit={ForgotPasswordSubmit}>
                        <div className="loginEmail">
                            <MailOutlineIcon/>
                            <input type="email" placeholder="Email" required name="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                        </div>
                        <input type="submit" value="Reset my Password" className="forgotPasswordBtn" />
                        <input type="submit" value="<  Back To Login" className="PasswordBtn" onClick={()=>navigate("/login")}/>
                    </form>
                </div>
            </div>
        </>
    }
    </>
  )
}

export default UpdatePassword