import { combineReducers } from '@reduxjs/toolkit';
import { apiSlice } from '../slices/apiSlice';
import { authApi } from '../services/authApi';
import cartReducer from '../slices/cartSlice';
import authReducer from './authReducer';

const rootReducer = combineReducers({
    [apiSlice.reducerPath]: apiSlice.reducer,
    [authApi.reducerPath]: authApi.reducer,
    cart: cartReducer,
    auth: authReducer
});

export default rootReducer;