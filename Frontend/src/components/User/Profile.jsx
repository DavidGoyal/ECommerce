import { useSelector } from 'react-redux'
import Metadata from '../Metadata'
import { Link, useNavigate } from 'react-router-dom'
import Loader from "../Loader/Loader"
import { useEffect } from 'react'
import "./Profile.css"

const Profile = () => {
    const {userData,loading,isAuthenticated}=useSelector(state=>state.user)
    const navigate=useNavigate();

    useEffect(() => {
      if(!isAuthenticated){
        navigate("/login")
      }
    }, [isAuthenticated,navigate])
    
  return (
    <>
        {loading?<Loader/>:
        <>
            <Metadata title={`${userData.name}'s Profile`}/>
            <div className="profileContainer">
                <div>
                    <h1>My Profile</h1>
                    <img src={userData.avatar.url} alt={userData.name} />
                    <Link to="/me/update">Edit Profile</Link>
                </div>
                <div>
                    <div>
                        <h4>Full Name</h4>
                        <p>{userData.name}</p>
                    </div>
                    <div>
                        <h4>Email</h4>
                        <p>{userData.email}</p>
                    </div>
                    <div>
                        <h4>Joined On</h4>
                        <p>{String(userData.createdAt).substr(0, 10)}</p>
                    </div>

                    <div>
                        <Link to="/orders">My Orders</Link>
                        <Link to="/password/update">Change Password</Link>
                    </div>
                </div>
            </div>
        </>}
    </>
  )
}

export default Profile