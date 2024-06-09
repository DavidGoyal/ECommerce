import { createReducer } from "@reduxjs/toolkit";
import {
  CREATE_ORDER_FAIL,
  CLEAR_ERRORS,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  MY_ORDERS_REQUEST,
  MY_ORDERS_SUCCESS,
  MY_ORDERS_FAIL,
  SINGLE_ORDER_REQUEST,
  SINGLE_ORDER_SUCCESS,
  SINGLE_ORDER_FAIL,
  ALL_ORDERS_REQUEST,
  ALL_ORDERS_SUCCESS,
  ALL_ORDERS_FAIL,
  UPDATE_ORDER_REQUEST,
  UPDATE_ORDER_SUCCESS,
  UPDATE_ORDER_FAIL,
  UPDATE_ORDER_RESET,
  DELETE_ORDER_REQUEST,
  DELETE_ORDER_SUCCESS,
  DELETE_ORDER_FAIL,
  DELETE_ORDER_RESET,
} from "../constants/orderConstants";

export const createOrder=createReducer({
    loading:false,
    order:null,
    error:null,
},
(builder)=>
    builder
    .addCase(CREATE_ORDER_REQUEST,(state)=>
    {
        state.loading=true;
    })
    .addCase(CREATE_ORDER_SUCCESS,(state,action)=>
    {
        state.loading=false;
        state.order=action.payload;
    })
    .addCase(CREATE_ORDER_FAIL,(state,action)=>
    {
        state.loading=false;
        state.error=action.payload;
    })
    .addCase(CLEAR_ERRORS,(state)=>
    {
        state.error=null;
    })
)



export const getAllOrders=createReducer({
    orders:[],
    loading:false,
    error:null,
},
(builder)=>
    builder
    .addCase(MY_ORDERS_REQUEST,(state)=>
    {
        state.loading=true;
    })
    .addCase(ALL_ORDERS_REQUEST,(state)=>
    {
        state.loading=true;
    })
    .addCase(MY_ORDERS_SUCCESS,(state, action)=>
    {
        state.loading=false;
        state.orders=action.payload;
    })
    .addCase(ALL_ORDERS_SUCCESS,(state, action)=>
    {
        state.loading=false;
        state.orders=action.payload;
    })
    .addCase(MY_ORDERS_FAIL,(state, action)=>
    {
        state.loading=false;
        state.error=action.payload;
    })
    .addCase(ALL_ORDERS_FAIL,(state, action)=>
    {
        state.loading=false;
        state.error=action.payload;
    })
    .addCase(CLEAR_ERRORS,(state)=>
    {
        state.error=null;
    })
)



export const getSingleOrder=createReducer({
    order:{},
    loading:false,
    error:null,
},
(builder)=>
    builder
    .addCase(SINGLE_ORDER_REQUEST,(state)=>
    {
        state.loading=true;
    })
    .addCase(SINGLE_ORDER_SUCCESS,(state, action)=>
    {
        state.loading=false;
        state.order=action.payload;
    })
    .addCase(SINGLE_ORDER_FAIL,(state, action)=>
    {
        state.loading=false;
        state.error=action.payload;
    })
    .addCase(CLEAR_ERRORS,(state)=>
    {
        state.error=null;
    })
)


export const singleOrderReducer=createReducer({
    loading:false,
    error:null,
    success:false,
},
(builder)=>
    builder
    .addCase(UPDATE_ORDER_REQUEST,(state)=>
    {
        state.loading=true;
    })
    .addCase(DELETE_ORDER_REQUEST,(state)=>
    {
        state.loading=true;
    })
    .addCase(UPDATE_ORDER_SUCCESS,(state, action)=>
    {
        state.loading=false;
        state.success=action.payload;
    })
    .addCase(DELETE_ORDER_SUCCESS,(state, action)=>
    {
        state.loading=false;
        state.success=action.payload;
    })
    .addCase(UPDATE_ORDER_FAIL,(state, action)=>
    {
        state.loading=false;
        state.error=action.payload;
    })
    .addCase(DELETE_ORDER_FAIL,(state, action)=>
    {
        state.loading=false;
        state.error=action.payload;
    })
    .addCase(UPDATE_ORDER_RESET,(state)=>
    {
        state.success=false;
    })
    .addCase(DELETE_ORDER_RESET,(state)=>
    {
        state.success=false;
    })
    .addCase(CLEAR_ERRORS,(state)=>
    {
        state.error=null;
    })
)