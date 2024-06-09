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
  NEW_REVIEW_RESET,
  ADMIN_PRODUCT_REQUEST,
  ADMIN_PRODUCT_SUCCESS,
  ADMIN_PRODUCT_FAIL,
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_RESET,
  CREATE_PRODUCT_FAIL,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_RESET,
  DELETE_PRODUCT_FAIL,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_RESET,
  UPDATE_PRODUCT_FAIL,
  GET_REVIEWS_REQUEST,
  GET_REVIEWS_SUCCESS,
  GET_REVIEWS_FAIL,
  DELETE_REVIEW_REQUEST,
  DELETE_REVIEW_SUCCESS,
  DELETE_REVIEW_RESET,
  DELETE_REVIEW_FAIL,
  CLEAR_ERRORS,
} from "../constants/productConstants";
import { createReducer } from "@reduxjs/toolkit";

export const productReducer = createReducer(
  {
    products: [],
    loading: false,
    error: null,
    productsCount: 0,
    resultPerPage: 0,
    filteredProductsCount: 0,
  },
  (builder) => {
    builder
      .addCase(ALL_PRODUCT_REQUEST, (state) => {
        state.loading = true;
        state.products = [];
      })
      .addCase(ADMIN_PRODUCT_REQUEST, (state) => {
        state.loading = true;
        state.products = [];
      })
      .addCase(ADMIN_PRODUCT_SUCCESS, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(ALL_PRODUCT_SUCCESS, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
        state.productsCount = action.payload.productsCount;
        state.resultPerPage = action.payload.resultPerPage;
        state.filteredProductsCount = action.payload.filteredProductsCount;
      })
      .addCase(ADMIN_PRODUCT_FAIL, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(ALL_PRODUCT_FAIL, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(CLEAR_ERRORS, (state) => {
        state.error = null;
      });
  }
);


export const productDetailsReducer = createReducer(
    {
      product: {},
      loading: false,
      error: null,
    },
    (builder) => {
      builder
        .addCase(PRODUCT_DETAILS_REQUEST, (state) => {
          state.loading = true;
          state.product = {};
        })
        .addCase(PRODUCT_DETAILS_SUCCESS, (state, action) => {
          state.loading = false;
          state.product = action.payload;
        })
        .addCase(PRODUCT_DETAILS_FAIL, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })
        .addCase(CLEAR_ERRORS, (state) => {
          state.error = null;
        });
    }
  );


  export const newReviewReducer = createReducer(
    {
      success: false,
      loading: false,
      error: null,
    },
    (builder) => {
      builder
        .addCase(NEW_REVIEW_REQUEST, (state) => {
          state.loading = true;
        })
        .addCase(NEW_REVIEW_SUCCESS, (state, action) => {
          state.loading = false;
          state.success = action.payload;
        })
        .addCase(NEW_REVIEW_FAIL, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })
        .addCase(NEW_REVIEW_RESET, (state) => {
          state.success = false;
        })
        .addCase(CLEAR_ERRORS, (state) => {
          state.error = null;
        });
    }
  );


export const newProductReducer=createReducer(
    {
        loading:false,
        success:false,
        product:{},
        error:null
    },
    (builder)=>{
        builder
        .addCase(CREATE_PRODUCT_REQUEST,(state)=>{
            state.loading=true;
        })
        .addCase(DELETE_PRODUCT_REQUEST,(state)=>{
            state.loading=true;
        })
        .addCase(UPDATE_PRODUCT_REQUEST,(state)=>{
            state.loading=true;
        })
        .addCase(CREATE_PRODUCT_SUCCESS,(state,action)=>{
            state.loading=false;
            state.success=action.payload.success;
            state.product=action.payload.product;
        })
        .addCase(DELETE_PRODUCT_SUCCESS,(state, action)=>{
            state.loading=false;
            state.success=action.payload;
        })
        .addCase(UPDATE_PRODUCT_SUCCESS,(state, action)=>{
            state.loading=false;
            state.success=action.payload.success;
            state.product=action.payload.product;
        })
        .addCase(CREATE_PRODUCT_FAIL,(state, action)=>{
            state.loading=false;
            state.error=action.payload;
        })
        .addCase(UPDATE_PRODUCT_FAIL,(state, action)=>{
            state.loading=false;
            state.error=action.payload;
        })
        .addCase(DELETE_PRODUCT_FAIL,(state, action)=>{
            state.loading=false;
            state.error=action.payload;
        })
        .addCase(CREATE_PRODUCT_RESET,(state)=>{
            state.success=false;
        })
        .addCase(DELETE_PRODUCT_RESET,(state)=>{
            state.success=false;
        })
        .addCase(UPDATE_PRODUCT_RESET,(state)=>{
            state.success=false;
        })
        .addCase(CLEAR_ERRORS,(state)=>{
            state.error=null;
        })
    }
)


export const reviewReducer=createReducer(
    {
        reviews:[],
        loading:false,
        error:null,
    },
    (builder)=>{
        builder
        .addCase(GET_REVIEWS_REQUEST,(state)=>{
            state.loading=true;
        })
        .addCase(GET_REVIEWS_SUCCESS,(state, action)=>{
            state.loading=false;
            state.reviews=action.payload;
        })
        .addCase(GET_REVIEWS_FAIL,(state, action)=>{
            state.loading=false;
            state.error=action.payload;
        })
        .addCase(CLEAR_ERRORS,(state)=>{
            state.error=null;
        })
    }
)


export const deleteReviewReducer=createReducer(
  {
      loading:false,
      error:null,
      success:false,
  },
  (builder)=>{
      builder
      .addCase(DELETE_REVIEW_REQUEST,(state)=>{
          state.loading=true;
      })
      .addCase(DELETE_REVIEW_SUCCESS,(state, action)=>{
          state.loading=false;
          state.success=action.payload;
      })
      .addCase(DELETE_REVIEW_FAIL,(state, action)=>{
          state.loading=false;
          state.error=action.payload;
      })
      .addCase(DELETE_REVIEW_RESET,(state)=>{
          state.success=false;
      })
      .addCase(CLEAR_ERRORS,(state)=>{
          state.error=null;
      })
  }
)