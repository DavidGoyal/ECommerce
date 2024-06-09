import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import "./LoginSignUp.css"
import { useEffect, useRef, useState } from "react";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LockIcon from '@mui/icons-material/Lock';
import FaceIcon from '@mui/icons-material/Face';
import img1 from "../../assets/Profile.png"
import { clearErrors, login,register } from '../../actions/userActions';
import {useAlert} from "react-alert" 
import Loader from '../Loader/Loader';
import Metadata from '../Metadata';

const LoginSignUp = () => {
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [avatar,setAvatar]=useState("");
    const [avatarPreview,setAvatarPreview]=useState(img1);
    const [user,setUser]=useState({
        name:"",
        email:"",
        password:"",
    });
    const dispatch=useDispatch();
    const {loading,error,isAuthenticated}=useSelector(state=>state.user)
    const alert=useAlert();
    const navigate=useNavigate();

    const loginTab=useRef(null)
    const registerTab=useRef(null)
    const switcherTab=useRef(null)


const redirect = new URLSearchParams(window.location.search).get("redirect")|| 'account';


    const loginSubmit=(e)=>{
        e.preventDefault();
        dispatch(login(email,password))
    }

    const registerSubmit=(e)=>{
        e.preventDefault();
        const myForm=new FormData()

        myForm.set("name", user.name);
        myForm.set("email", user.email);
        myForm.set("password", user.password);
        myForm.set("avatar", avatar);
        dispatch(register(myForm))  
    }


    const registerDataChange=(e)=>{
        if(e.target.name==="avatar"){
            const reader=new FileReader();

            reader.onload=()=>{
                if(reader.readyState===2){
                    setAvatarPreview(reader.result);
                    setAvatar(reader.result);
                }
            }

            reader.readAsDataURL(e.target.files[0]);
        }else{
            setUser({...user, [e.target.name]:e.target.value})
        }
    }

    const switchTabs=(e,tab)=>{
        if(tab==="login"){
            switcherTab.current.classList.add("shiftToNeutral");
            switcherTab.current.classList.remove("shiftToRight");

            registerTab.current.classList.remove("shiftToNeutralForm");
            loginTab.current.classList.remove("shiftToLeft");
        }
        if(tab==="register"){
            switcherTab.current.classList.add("shiftToRight");
            switcherTab.current.classList.remove("shiftToNeutral");

            registerTab.current.classList.add("shiftToNeutralForm");
            loginTab.current.classList.add("shiftToLeft");
        }
    }


    useEffect(() => {
        if(error){
            alert.error(error);
            dispatch(clearErrors());
          }

          if(isAuthenticated){
            navigate(`/${redirect}`)
          }
    }, [error,dispatch,alert,isAuthenticated,navigate,redirect])
    

  return (
    <>
        <Metadata title="Ecommerce SignIn/Registration"/>
        {loading?<Loader/>:
        <>
            <div className="LoginSignUpContainer">
                <div className="LoginSignUpBox">
                    <div>
                        <div className="login_signUp_toogle">
                            <p onClick={(e)=>switchTabs(e,"login")}>LOGIN</p>
                            <p onClick={(e)=>switchTabs(e,"register")}>REGISTER</p>
                        </div>
                        <button ref={switcherTab}></button>
                    </div>

                    <form className="loginForm" ref={loginTab} onSubmit={loginSubmit}>
                        <div className="loginEmail">
                            <MailOutlineIcon/>
                            <input type="email" placeholder="Email" required name="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                        </div>
                        <div className="loginPassword">
                            <LockIcon/>
                            <input type="password" placeholder="Password" name="password" required value={password} onChange={(e)=>setPassword(e.target.value)}/>
                        </div>
                        <Link to="/password/forgot">Forgot Password ?</Link>
                        <input type="submit" value="Login" className="loginBtn"/>
                    </form>

                    <form className="signUpForm" ref={registerTab} encType="multipart/form-data" onSubmit={registerSubmit}>
                        <div className="signUpName">
                            <FaceIcon/>
                            <input type="text" placeholder="Name" required name="name" value={user.name} onChange={registerDataChange} />
                        </div>
                        <div className="signUpEmail">
                            <MailOutlineIcon/>
                            <input type="email" placeholder="Email" required name="email" value={user.email} onChange={registerDataChange}/>
                        </div>
                        <div className="signUpPassword">
                            <LockIcon/>
                            <input type="password" placeholder="Password" name="password" required value={user.password} onChange={registerDataChange}/>
                        </div>
                        <div id="registerImage">
                            <img src={avatarPreview} alt="Avatar Preview" />
                            <input type="file" name="avatar" accept="image/*" onChange={registerDataChange}/>
                        </div>
                        <input type="submit" value="Register" className="signUpBtn" />
                    </form>
                </div>
            </div>
        </>}
    </>
  )
}

export default LoginSignUp