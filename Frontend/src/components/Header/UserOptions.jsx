/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Backdrop, SpeedDial, SpeedDialAction } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import {useDispatch,useSelector} from "react-redux"
import img1 from "../../assets/Profile.png";
import "./Header.css";
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ListAltIcon from '@mui/icons-material/ListAlt';
import { logout } from '../../actions/userActions';
import {useAlert} from "react-alert"

const UserOptions = ({ user }) => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const dispatch=useDispatch();
    const {cartItems}=useSelector((state)=>state.cart);
    const alert=useAlert();

    const actions = [
        { icon: <ListAltIcon/>, name: 'Orders', val: "orders" },
        { icon: <PersonIcon/>, name: 'Profile', val: "profile" },
        { icon: <ShoppingCartIcon style={{color:cartItems.length>0?"tomato":"unset"}}/>, name: `Cart(${cartItems.length})`, val: "cart" },
        { icon: <ExitToAppIcon/>, name: 'Logout', val: "logout" },

    ];

    if(user.role=="admin"){
        actions.unshift({ icon: <DashboardIcon/>, name: 'Dashboard', val: "dashboard" })
    }
    const handleAction = (action) => {
        switch (action) {
            case "profile":
                navigate("/account");
                break;
            case "logout":
                dispatch(logout());
                alert.success("Logged Out Successfully")
                break;
            case "cart":
                navigate("/Cart");
                break;
            case "dashboard":
                navigate("/admin/dashboard");
                break;
            case "orders":
                navigate("/orders");
                break;
            default:
                break;
        }
        setOpen(false);
    };

    return (
        <>
            <Backdrop open={open} />    
            <SpeedDial
                ariaLabel="SpeedDial basic example"
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                open={open}
                style={{ zIndex: 11 }}
                className='speedDial'
                icon={<img className="speedDialIcon" src={user.avatar.url ? user.avatar.url : img1} alt="Profile" />}
                direction="down"
            >
                {actions.map((action) => (
                    <SpeedDialAction
                        key={action.name}
                        icon={action.icon}
                        tooltipTitle={action.name}
                        onClick={() => handleAction(action.val)}
                        tooltipOpen={window.innerWidth <= 600}
                    />
                ))}
            </SpeedDial>
        </>
    );
};

export default UserOptions;
