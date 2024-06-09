import {ADD_TO_CART,REMOVE_FROM_CART,SAVE_SHIPPING_INFO} from "../constants/cartConstants"
import {createReducer} from "@reduxjs/toolkit"


export const cartReducer=createReducer({cartItems:[],shippingInfo:{}},(builder)=>{
    builder
    .addCase(ADD_TO_CART,(state,action)=>{
        const item=action.payload;
        const exist=state.cartItems.find((x)=>x.product===item.product) 
        if(exist){
            state.cartItems[state.cartItems.indexOf(exist)]=item;
        }else{
            state.cartItems.push(item);
        }
    })
    .addCase(REMOVE_FROM_CART,(state,action)=>{
        const item=action.payload;
        state.cartItems=state.cartItems.filter((x)=>x.product!==item);
    })
    .addCase(SAVE_SHIPPING_INFO,(state, action)=>{
        state.shippingInfo=action.payload;
    })
})
