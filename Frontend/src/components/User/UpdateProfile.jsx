import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import "./UpdateProfile.css"
import { useEffect, useState } from "react";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import FaceIcon from '@mui/icons-material/Face';
import img1 from "../../assets/Profile.png"
import { clearErrors, loadUser, updateProfile } from '../../actions/userActions';
import {useAlert} from "react-alert" 
import Loader from '../Loader/Loader';
import { UPDATE_PROFILE_RESET } from '../../constants/userConstants';
import Metadata from '../Metadata';

const UpdateProfile = () => {
    const [avatar,setAvatar]=useState("");
    const [avatarPreview,setAvatarPreview]=useState(img1);
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");


    const dispatch=useDispatch();
    const alert=useAlert();
    const navigate=useNavigate();

    const {userData}=useSelector(state=>state.user)
    const {loading,error,isUpdated}=useSelector(state=>state.profile)

    const UpdateProfileSubmit=(e)=>{
        e.preventDefault();
        const myForm=new FormData()

        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("avatar", avatar);
        dispatch(updateProfile(myForm))  
    }


    const UpdateProfileDataChange=(e)=>{
        if(e.target.name==="avatar"){
            const reader=new FileReader();

            reader.onload=()=>{
                if(reader.readyState===2){
                    setAvatarPreview(reader.result);
                    setAvatar(reader.result);
                }
            }

            reader.readAsDataURL(e.target.files[0]);
        }
    }

    useEffect(() => {

        if(userData){
            setName(userData.name);
            setEmail(userData.email);
            setAvatarPreview(userData.avatar.url);
        }

        if(error){
            alert.error(error);
            dispatch(clearErrors());
        }

        if(isUpdated){
            alert.success("Profile Updated Successfully");
            dispatch(loadUser());
            navigate("/account");
            dispatch({
                type:UPDATE_PROFILE_RESET,
            })
        }
    }, [error,dispatch,alert,isUpdated,navigate,userData])

  return (
    <>
    <Metadata title="ECommerce Update profile"/>
    {loading?<Loader/>:
        <>
            <div className="UpdateProfileContainer">
                <div className="UpdateProfileBox">
                    <h2 className='updateProfileHeading'>Update Profile</h2>
                    <form className="updateProfile" encType="multipart/form-data" onSubmit={UpdateProfileSubmit}>
                        <div>
                            <FaceIcon/>
                            <input type="text" placeholder="Name" required name="name" value={name} onChange={(e)=>setName(e.target.value)} />
                        </div>
                        <div>
                            <MailOutlineIcon/>
                            <input type="email" placeholder="Email" required name="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                        </div>
                        <div id="updateProfileImage">
                            <img src={avatarPreview} alt="Avatar Preview" />
                            <input type="file" name="avatar" accept="image/*" onChange={UpdateProfileDataChange}/>
                        </div>
                        <input type="submit" value="Update Profile" className="updateProfileBtn" />
                    </form>
                </div>
            </div>
        </>
    }
    </>
  )
}

export default UpdateProfile