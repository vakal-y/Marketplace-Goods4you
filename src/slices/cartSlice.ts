import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState, CartState } from '../interfaces/types';
import { apiSlice } from './apiSlice';

const initialState: CartState = {
    items: [],
    status: 'idle',
    error: null,
};

export const fetchCart = createAsyncThunk<any, string>(
    'cart/fetchCart',
    async (userId: string, { dispatch }) => {
        const result = await dispatch(apiSlice.endpoints.getCartByUserId.initiate(userId)).unwrap();
        return result;
    });

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCart.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = Array.isArray(action.payload) ? action.payload : [];
            })
            .addCase(fetchCart.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || null;
            });
    }
});

export const selectCartItems = (state: RootState) => state.cart.items;
export default cartSlice.reducer;