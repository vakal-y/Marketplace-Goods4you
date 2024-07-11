import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState, CartState, Product } from '../interfaces/types';

// Начальное состояние
const initialState: CartState = {
    items: [],
    status: 'idle',
    error: null,
};

// Асинхронный thunk для получения данных корзины
export const fetchCart = createAsyncThunk<Product[], string>(
    'cart/fetchCart',
    async (userId: string) => {
        const response = await fetch(`https://dummyjson.com/carts/user/${userId}`);
        const data = await response.json();
        return data.carts[0].products;
    }
);

// Создание среза корзины
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
                state.items = action.payload;
            })
            .addCase(fetchCart.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || null;
            });
    }
});

export const selectCartItems = (state: RootState) => state.cart.items;
export const selectCartStatus = (state: RootState) => state.cart.status;
export const selectCartError = (state: RootState) => state.cart.error;

export default cartSlice.reducer;