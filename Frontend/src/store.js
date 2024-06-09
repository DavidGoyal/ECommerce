import {configureStore} from "@reduxjs/toolkit"
import {productReducer,productDetailsReducer, newReviewReducer, newProductReducer, reviewReducer, deleteReviewReducer} from "./reducers/productReducer"
import { userReducer,profileReducer, forgotPasswordReducer, allUsersReducer, singleUserReducer } from "./reducers/userReducer";
import { cartReducer } from "./reducers/cartReducer";
import { createOrder, getAllOrders, getSingleOrder, singleOrderReducer } from "./reducers/orderReducer";

let initialState={
    cart:{
        cartItems:localStorage.getItem("cartItems")?JSON.parse(localStorage.getItem("cartItems")):[],
        shippingInfo:localStorage.getItem("shippingInfo")?JSON.parse(localStorage.getItem("shippingInfo")):{},
    },
}

const store=configureStore({
    reducer:{
        products:productReducer,
        productDetails:productDetailsReducer,
        user:userReducer,
        profile:profileReducer,
        forgotPassword:forgotPasswordReducer,
        allUsers:allUsersReducer,
        singleUser:singleUserReducer,
        cart:cartReducer,
        newOrder:createOrder,
        myAllOrders:getAllOrders,
        singleOrder:getSingleOrder,
        adminOrder:singleOrderReducer,
        newReview:newReviewReducer,
        allReviews:reviewReducer,
        deleteReview:deleteReviewReducer,
        newProduct:newProductReducer,
    },
    preloadedState:initialState
})


export default store;