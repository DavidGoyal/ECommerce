import { useState } from 'react'
import {Route, BrowserRouter as Router,Routes} from "react-router-dom"
import Header from "./components/Header/Header"
import WebFont from "webfontloader"
import { useEffect } from "react"
import Footer from "./components/Footer/Footer"
import Home from "./components/Home/Home"
import "./App.css"
import ProductDetails from "./components/Product/ProductDetails"
import Products from "./components/Product/Products"
import Search from "./components/Product/Search"
import LoginSignUp from "./components/User/LoginSignUp"
import store from "./store"
import { loadUser } from "./actions/userActions"
import { useSelector } from "react-redux"
import UserOptions from "./components/Header/UserOptions"
import Profile from "./components/User/Profile"
import ProtectedRoute from "./components/Route/ProtectedRoute"
import UpdateProfile from "./components/User/UpdateProfile"
import UpdatePassword from "./components/User/UpdatePassword"
import ForgotPassword from "./components/User/ForgotPassword"
import ResetPassword from "./components/User/ResetPassword"
import Cart from "./components/Cart/Cart"
import Shipping from "./components/Cart/Shipping"
import ConfirmOrder from "./components/Cart/ConfirmOrder"
import axios from 'axios'
import Payment from './components/Cart/Payment'
import {Elements} from "@stripe/react-stripe-js"
import {loadStripe} from "@stripe/stripe-js"
import OrderSuccess from './components/Cart/OrderSuccess'
import MyOrders from './components/Order/MyOrders'
import GetSingleOrder from './components/Order/GetSingleOrder'
import Dashboard from './components/Admin/Dashboard'
import ProductList from './components/Admin/ProductList'
import NewProduct from './components/Admin/NewProduct'
import UpdateProduct from './components/Admin/UpdateProduct'
import OrderList from './components/Admin/OrderList'
import UpdateOrder from './components/Admin/UpdateOrder'
import UsersList from './components/Admin/UsersList'
import UpdateUser from './components/Admin/UpdateUser'
import ReviewList from './components/Admin/ReviewList'
import Contact from './components/Contact/Contact'
import About from './components/About/About'
import PageNotFound from './components/Page Not Found/PageNotFound'

function App() {
  const [apikey,setApikey]=useState("")

  async function getStripeApiKey(){
    const {data}=await axios.get("/api/v1/stripeapikey")

    setApikey(data.stripeApiKey)
  }

  useEffect(()=>{
    WebFont.load({
      google:{
        families:["Roboto","Droid Sans","Chilanka"]
      }
    })
    store.dispatch(loadUser());
    getStripeApiKey();
  },[])

  const {isAuthenticated,userData} = useSelector(state=>state.user);
  
  return (
    <Router>
      <Header/>
      {isAuthenticated&&<UserOptions user={userData}/>}
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/product/:id" element={<ProductDetails/>}/>
        <Route path="/products" element={<Products/>}/>
        <Route path="/products/:keyword" element={<Products/>}/>
        <Route path="/Search" element={<Search/>}/>
        <Route path="/login" element={<LoginSignUp/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/about" element={<About/>}/>
        <Route element={<ProtectedRoute />}>
          <Route path="/account" element={<Profile />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/me/update" element={<UpdateProfile />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/password/update" element={<UpdatePassword />} />
        </Route>
        <Route path="/password/forgot" element={<ForgotPassword />} />
        <Route path="/password/reset/:token" element={<ResetPassword />} />
        <Route path="/Cart" element={<Cart/>}/>
        <Route element={<ProtectedRoute />}>
          <Route path="/shipping" element={<Shipping />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/order/confirm" element={<ConfirmOrder />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/process/payment" element={ <Elements stripe={apikey ? loadStripe(apikey) : null}><Payment /></Elements>} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/success" element={<OrderSuccess />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/orders" element={<MyOrders />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/order/:id" element={<GetSingleOrder/>} />
        </Route>
        <Route element={<ProtectedRoute isAdmin="true" />}>
          <Route path="/admin/dashboard" element={<Dashboard/>} />
        </Route>
        <Route element={<ProtectedRoute isAdmin="true" />}>
          <Route path="/admin/products" element={<ProductList/>} />
        </Route>
        <Route element={<ProtectedRoute isAdmin="true" />}>
          <Route path="/admin/product" element={<NewProduct/>} />
        </Route>
        <Route element={<ProtectedRoute isAdmin="true" />}>
          <Route path="/admin/product/:id" element={<UpdateProduct/>} />
        </Route>
        <Route element={<ProtectedRoute isAdmin="true" />}>
          <Route path="/admin/orders" element={<OrderList/>} />
        </Route>
        <Route element={<ProtectedRoute isAdmin="true" />}>
          <Route path="/admin/order/:id" element={<UpdateOrder/>} />
        </Route>
        <Route element={<ProtectedRoute isAdmin="true" />}>
          <Route path="/admin/users" element={<UsersList/>} />
        </Route>
        <Route element={<ProtectedRoute isAdmin="true" />}>
          <Route path="/admin/user/:id" element={<UpdateUser/>} />
        </Route>
        <Route element={<ProtectedRoute isAdmin="true" />}>
          <Route path="/admin/reviews" element={<ReviewList/>} />
        </Route>
        <Route path="*" element={<PageNotFound/>}/>
      </Routes>
      <Footer/>
    </Router>
  )
}

export default App
