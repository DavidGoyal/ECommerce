import axios from "axios"
import {
  ALL_PRODUCT_FAIL,
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  NEW_REVIEW_REQUEST,
  NEW_REVIEW_SUCCESS,
  NEW_REVIEW_FAIL,
  ADMIN_PRODUCT_REQUEST,
  ADMIN_PRODUCT_SUCCESS,
  ADMIN_PRODUCT_FAIL,
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_FAIL,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAIL,
  GET_REVIEWS_REQUEST,
  GET_REVIEWS_SUCCESS,
  GET_REVIEWS_FAIL,
  DELETE_REVIEW_REQUEST,
  DELETE_REVIEW_SUCCESS,
  DELETE_REVIEW_FAIL,
  CLEAR_ERRORS,
} from "../constants/productConstants";


export const getAllProducts = (keyword="",currentPage=1,price=[0,25000],category,rating=0) => async (dispatch) => {
    try {

        dispatch({ type: ALL_PRODUCT_REQUEST });

        let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${rating}`;

        if (category) {
          link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${rating}`;
        }

        const { data } = await axios.get(link);
        
        dispatch({
            type: ALL_PRODUCT_SUCCESS,
            payload: data,
        });
    } 
    catch (error) {
        dispatch({
            type: ALL_PRODUCT_FAIL,
            payload: error.response.data.message,
        });
    }
};


export const getProductDetails = (id) => async (dispatch) => {
    try {

        dispatch({ type: PRODUCT_DETAILS_REQUEST });

        const { data } = await axios.get(`/api/v1/products/${id}`);
        
        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data.product,
        });
    } 
    catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response.data.message,
        });
    }
};


export const addReview = (reviewData) => async (dispatch) => {
    try {

        dispatch({ type: NEW_REVIEW_REQUEST });

        const config = {
            headers: { "Content-Type": "application/json" },
        }

        const { data } = await axios.put(`/api/v1/review`,reviewData,config);
        
        dispatch({
            type: NEW_REVIEW_SUCCESS,
            payload: data.success,
        });
    } 
    catch (error) {
        dispatch({
            type: NEW_REVIEW_FAIL,
            payload: error.response.data.message,
        });
    }
};


export const getAdminProducts = () => async (dispatch) => {
    try {

        dispatch({ type: ADMIN_PRODUCT_REQUEST });

        const { data } = await axios.get(`/api/v1/admin/products`);

        dispatch({
            type: ADMIN_PRODUCT_SUCCESS,
            payload: data.products,
        });
    }
    catch (error) {
        dispatch({
            type: ADMIN_PRODUCT_FAIL,
            payload: error.response.data.message,
        });
    }
};


export const createAdminProduct=(productData)=>async(dispatch)=>{
    try {
        dispatch({type:CREATE_PRODUCT_REQUEST});
        const config={
            headers:{
                "Content-Type":"application/json"
            }
        }
        const {data}=await axios.post("/api/v1/admin/products/new",productData,config);
        dispatch({type:CREATE_PRODUCT_SUCCESS,payload:data});
    } catch (error) {
        dispatch({type:CREATE_PRODUCT_FAIL,payload:error.response.data.message});
    }
}


export const updateAdminProduct=(id, productData)=>async(dispatch)=>{
    try {
        dispatch({type:UPDATE_PRODUCT_REQUEST});
        const config={
            headers:{
                "Content-Type":"application/json"
            }
        }
        const {data}=await axios.put(`/api/v1/admin/products/${id}`, productData, config);
        dispatch({type:UPDATE_PRODUCT_SUCCESS, payload:data});
    } catch (error) {
        dispatch({type:UPDATE_PRODUCT_FAIL, payload:error.response.data.message});
    }
}



export const deleteAdminProduct=(id)=>async(dispatch)=>{
    try {
        dispatch({type:DELETE_PRODUCT_REQUEST});
        const {data}=await axios.delete(`/api/v1/admin/products/${id}`);
        dispatch({type:DELETE_PRODUCT_SUCCESS, payload:data.success});
    } catch (error) {
        dispatch({type:DELETE_PRODUCT_FAIL, payload:error.response.data.message});
    }
}


export const getAllAdminReviews=(id)=>async(dispatch)=>{
    try {
        dispatch({type:GET_REVIEWS_REQUEST});
        const {data}=await axios.get(`/api/v1/reviews?id=${id}`);
        dispatch({type:GET_REVIEWS_SUCCESS, payload:data.reviews});
    } catch (error) {
        dispatch({type:GET_REVIEWS_FAIL, payload:error.response.data.message});
    }
}


export const deleteAdminReview=(reviewId, productId)=>async(dispatch)=>{
    try {
        dispatch({type:DELETE_REVIEW_REQUEST});
        const {data}=await axios.delete(`/api/v1/reviews?id=${reviewId}&productId=${productId}`);
        dispatch({type:DELETE_REVIEW_SUCCESS, payload:data.success});
    } catch (error) {
        dispatch({type:DELETE_REVIEW_FAIL, payload:error.response.data.message});
    }
}



export const clearErrors=()=>async(dispatch)=>{
    dispatch({type:CLEAR_ERRORS});
}