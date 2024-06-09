import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import PostAddIcon from '@mui/icons-material/PostAdd';
import AddIcon from '@mui/icons-material/Add';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PeopleIcon from '@mui/icons-material/People';
import RateReviewIcon from '@mui/icons-material/RateReview';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import {TreeItem} from '@mui/x-tree-view';
import "./Sidebar.css"
import {Link} from "react-router-dom"
import logo from "../../assets/logo.png"
import DashboardIcon from '@mui/icons-material/Dashboard';

const Sidebar = () => {
  return (
    <div className="sidebar">
        
        <Link to="/">
            <img src={logo} alt="ecommerce"></img>
        </Link>

        <Link to="/admin/dashboard">
            <p>
                <DashboardIcon/> Dashboard
            </p>
        </Link>

        <Link>
            <SimpleTreeView
                slots={{
                    collapseIcon:ExpandMoreIcon,
                    expandIcon:ImportExportIcon
                }}
            >
                <TreeItem itemId="1" label="Products">
                    <Link to="/admin/products">
                        <TreeItem itemId="2" label="All" slots={{icon:PostAddIcon}} />
                    </Link>

                    <Link to="/admin/product">
                        <TreeItem itemId="3" label="Create" slots={{icon:AddIcon}} />
                    </Link>
                </TreeItem>
            </SimpleTreeView>
        </Link>

        <Link to="/admin/orders">
            <p>
                <ListAltIcon/>
                Orders
            </p>
        </Link>

        <Link to="/admin/users">
            <p>
                <PeopleIcon/>
                Users
            </p>
        </Link>

        <Link to="/admin/reviews">
            <p>
                <RateReviewIcon/>
                Reviews
            </p>
        </Link>

    </div>
  )
}

export default Sidebar