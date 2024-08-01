import { combineReducers } from '@reduxjs/toolkit';
import { apiSlice } from '../slices/apiSlice';
import cartReducer from '../slices/cartSlice';

const rootReducer = combineReducers({
    [apiSlice.reducerPath]: apiSlice.reducer,
    cart: cartReducer,
});

export default rootReducer;