import { useDispatch, useSelector } from 'react-redux'
import Sidebar from './Sidebar'
import './Dashboard.css'
import { Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { Doughnut, Line } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from 'chart.js'
import { useEffect } from 'react'
import { clearErrors, getAdminProducts } from '../../actions/productActions'
import { useAlert } from 'react-alert'
import { getAllAdminOrders } from '../../actions/orderActions'
import { getAllAdminUsers } from '../../actions/userActions'
import Metadata from '../Metadata'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement)

const Dashboard = () => {
  const alert=useAlert();
  const dispatch=useDispatch();

  const {error,products} = useSelector((state) => state.products);
  const {orders,error:orderError}=useSelector(state=>state.myAllOrders);
  const {users,error:userError}=useSelector(state=>state.allUsers);

  let outOfStock=0;

  products && products.forEach((item)=>{
    if(item.stock===0){
      outOfStock+=1;
    }
  })

  let totalAmount=0;

  orders&&orders.forEach((item)=>{
    totalAmount+=item.totalPrice
  })

  const InStock=products.length-outOfStock

  const lineState = {
    labels: ['Initial Amount', 'Amount Earned'],
    datasets: [
      {
        label: 'TOTAL AMOUNT',
        backgroundColor: ['tomato'],
        hoverBackgroundColor: ['rgb(197, 72, 49)'],
        data: [0, totalAmount],
      },
    ],
  }

  const doughnutState = {
    labels: ['Out of Stock', 'InStock'],
    datasets: [
      {
        backgroundColor: ['#00A6B4', '#6800B4'],
        hoverBackgroundColor: ['#4B5000', '#35014F'],
        data: [outOfStock,InStock],
      },
    ],
  }

  useEffect(() => {
    if(error){
      alert.error(error)
      dispatch(clearErrors())
    }
    if(orderError){
      alert.error(orderError)
      dispatch(clearErrors())
    }
    if(userError){
      alert.error(userError)
      dispatch(clearErrors())
    }
    dispatch(getAdminProducts());
    dispatch(getAllAdminOrders());
    dispatch(getAllAdminUsers());
  }, [dispatch,error,alert,orderError,userError])
  

  return (
    <>
      <Metadata title="ECommerce Admin Dashboard"/>
      <div className='dashboard'>
          <Sidebar/>

          <div className="dashboardContainer">
            <Typography component="h1">Dashboard</Typography>

            <div className="dashboardSummary">

              <div>
                <p>
                  Total Amount <br />
                  ₹{totalAmount}
                </p>
              </div>

              <div className="dashboardSummaryBox2">
                <Link to="/admin/products">
                  <p>Products</p>
                  <p>{products.length}</p>
                </Link>
                <Link to="/admin/orders">
                  <p>Orders</p>
                  <p>{orders.length}</p>
                </Link>
                <Link to="/admin/users">
                  <p>Users</p>
                  <p>{users.length}</p>
                </Link>
              </div>

            </div>

            <div className="lineChart">
              <Line
                data={lineState}
                options={{ responsive: true }}
              />
            </div>

            <div className="doughnutChart">
              <Doughnut
                data={doughnutState}
                options={{responsive:true}}
              />
            </div>

          </div>
      </div>
    </>
  )
}

export default Dashboard