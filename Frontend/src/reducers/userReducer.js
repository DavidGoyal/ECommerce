import { createReducer } from "@reduxjs/toolkit";
import {
  CLEAR_ERRORS,
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOAD_REQUEST,
  LOAD_SUCCESS,
  LOAD_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_RESET,
  UPDATE_PROFILE_FAIL,
  UPDATE_PASSWORD_FAIL,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_RESET,
  FORGOT_PASSWORD_FAIL,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  ALL_USERS_REQUEST,
  ALL_USERS_SUCCESS,
  ALL_USERS_FAIL,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
  DELETE_USER_RESET,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  UPDATE_USER_RESET,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
} from "../constants/userConstants";

export const userReducer = createReducer(
    {
        userData:{},
        loading:true,
        isAuthenticated:false,
        error:null
    },
    (builder)=>{
        builder
        .addCase(LOGIN_REQUEST,(state)=>{
            state.loading=true;
        })
        .addCase(REGISTER_REQUEST,(state)=>{
            state.loading=true;
        })
        .addCase(LOAD_REQUEST,(state)=>{
            state.loading=true;
        })
        .addCase(LOGIN_SUCCESS,(state,action)=>{
            state.loading=false;
            state.isAuthenticated=true;
            state.userData=action.payload;
        })
        .addCase(REGISTER_SUCCESS,(state,action)=>{
            state.loading=false;
            state.isAuthenticated=true;
            state.userData=action.payload;
        })
        .addCase(LOGOUT_SUCCESS,(state)=>{
            state.loading=false;
            state.isAuthenticated=false;
            state.userData={};
        })
        .addCase(LOGOUT_FAIL,(state, action)=>{
            state.error=action.payload;
        })
        .addCase(LOAD_SUCCESS,(state, action)=>{
            state.loading=false;
            state.isAuthenticated=true;
            state.userData=action.payload;
        })
        .addCase(LOAD_FAIL,(state, action)=>{
            state.loading=false;
            state.isAuthenticated=false;
            state.userData={};
            state.error=action.payload;
        })
        .addCase(LOGIN_FAIL,(state,action)=>{
            state.loading=false;
            state.isAuthenticated=false;
            state.userData={};
            state.error=action.payload;
        })
        .addCase(REGISTER_FAIL,(state,action)=>{
            state.loading=false;
            state.isAuthenticated=false;
            state.userData={};
            state.error=action.payload;
        })
        .addCase(CLEAR_ERRORS, (state) => {
            state.error = null;
          });
    }
)


export const profileReducer = createReducer(
    {
        loading:false,
        isUpdated:false,
        error:null,
        isDeleted:false,
        message:null,
    },
    (builder)=>{
        builder
        .addCase(UPDATE_PROFILE_REQUEST,(state)=>{
            state.loading=true;
        })
        .addCase(UPDATE_PASSWORD_REQUEST,(state)=>{
            state.loading=true;
        })
        .addCase(UPDATE_USER_REQUEST,(state)=>{
            state.loading=true;
        })
        .addCase(DELETE_USER_REQUEST,(state)=>{
            state.loading=true;
        })
        .addCase(UPDATE_PROFILE_SUCCESS,(state, action)=>{
            state.loading=false;
            state.isUpdated=action.payload;
        })
        .addCase(UPDATE_PASSWORD_SUCCESS,(state, action)=>{
            state.loading=false;
            state.isUpdated=action.payload;
        })
        .addCase(UPDATE_USER_SUCCESS,(state, action)=>{
            state.loading=false;
            state.isUpdated=action.payload;
        })
        .addCase(DELETE_USER_SUCCESS,(state, action)=>{
            state.loading=false;
            state.isDeleted=action.payload.success;
            state.message=action.payload.message;
        })
        .addCase(UPDATE_PASSWORD_RESET,(state)=>{
            state.isUpdated=false;
        })
        .addCase(UPDATE_USER_FAIL,(state, action)=>{
            state.loading=false;
            state.error=action.payload;
        })
        .addCase(DELETE_USER_FAIL,(state, action)=>{
            state.loading=false;
            state.error=action.payload;
        })
        .addCase(UPDATE_USER_RESET,(state)=>{
            state.isUpdated=false;
        })
        .addCase(DELETE_USER_RESET,(state)=>{
            state.isDeleted=false;
        })
        .addCase(UPDATE_PROFILE_FAIL,(state, action)=>{
            state.loading=false;
            state.error=action.payload;
        })
        .addCase(UPDATE_PASSWORD_FAIL,(state, action)=>{
            state.loading=false;
            state.error=action.payload;
        })
        .addCase(UPDATE_PROFILE_RESET,(state)=>{
            state.isUpdated=false;
        })
        .addCase(CLEAR_ERRORS, (state) => {
            state.error = null;
          });
    }
)


export const forgotPasswordReducer=createReducer(
    {
        loading:false,
        error:null,
        message:null,
        success:false,
    },
    (builder)=>
        builder.
            addCase(FORGOT_PASSWORD_REQUEST,(state)=>{
                state.loading=true;
            })
            .addCase(RESET_PASSWORD_REQUEST,(state)=>{
                state.loading=true;
            })
            .addCase(FORGOT_PASSWORD_SUCCESS,(state, action)=>{
                state.loading=false;
                state.message=action.payload;
            })
            .addCase(RESET_PASSWORD_SUCCESS,(state, action)=>{
                state.loading=false;
                state.success=action.payload;
            })
            .addCase(RESET_PASSWORD_FAIL,(state, action)=>{
                state.loading=false;
                state.error=action.payload;
            })
            .addCase(FORGOT_PASSWORD_FAIL,(state, action)=>{
                state.loading=false;
                state.error=action.payload;
            })
            .addCase(CLEAR_ERRORS, (state) => {
                state.error = null;
              })
)



export const allUsersReducer=createReducer(
    {
        users:[],
        loading:false,
        error:null,
    },
    (builder)=>
        builder.
            addCase(ALL_USERS_REQUEST,(state)=>{
                state.loading=true;
            })
            .addCase(ALL_USERS_SUCCESS,(state, action)=>{
                state.loading=false;
                state.users=action.payload;
            })
            .addCase(ALL_USERS_FAIL,(state, action)=>{
                state.loading=false;
                state.error=action.payload;
            })
            .addCase(CLEAR_ERRORS, (state) => {
                state.error = null;
              })
)


export const singleUserReducer=createReducer(
    {
        user:{},
        loading:false,
        error:null,
        success:false,
        message:null,
    },
    (builder)=>
        builder.
            addCase(USER_DETAILS_REQUEST,(state)=>{
                state.loading=true;
            })
            .addCase(USER_DETAILS_SUCCESS,(state, action)=>{
                state.loading=false;
                state.user=action.payload;
            })
            .addCase(USER_DETAILS_FAIL,(state, action)=>{
                state.loading=false;
                state.error=action.payload;
            })
            .addCase(CLEAR_ERRORS, (state) => {
                state.error = null;
              })
)