import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Loader from '../Loader/Loader';

const ProtectedRoute = (isAdmin) => {
  const { loading, isAuthenticated, userData } = useSelector(state => state.user);

  if (loading === true) {
    return <Loader/>;
  }

  if(isAdmin === true && userData.role !== "admin"){
    return <Navigate to="/login" />
  }
  
  return isAuthenticated===false ?<Navigate to="/login" />: <Outlet />;
};

export default ProtectedRoute;
