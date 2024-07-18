import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState, CartState, Product } from '../interfaces/types';

// Начальное состояние
const initialState: CartState = {
    items: [],
    status: 'idle',
    error: null,
};

// Асинхронный thunk для получения данных корзины
export const fetchCart = createAsyncThunk<Product[], void, { state: RootState }>(
    'cart/fetchCart',
    async (_, { getState, rejectWithValue }) => {
        const state = getState();
        const user = state.auth.user;

        if (!user) {
            return rejectWithValue('User is not authenticated');
        }

        const response = await fetch(`https://dummyjson.com/carts/user/${user.id}`);
        if (!response.ok) {
            return rejectWithValue('Failed to fetch cart data');
        }

        const data = await response.json();
        return data.carts[0].products;
    }
);

// Асинхронный thunk для обновления данных корзины
export const updateCart = createAsyncThunk<Product[], { userId: number, products: Product[] }, { state: RootState }>(
    'cart/updateCart',
    async ({ userId, products }, { rejectWithValue }) => {
        try {
            const response = await fetch(`https://dummyjson.com/carts/${userId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    merge: false,
                    products: products
                }),
            });
            if (!response.ok) {
                throw new Error('Failed to update cart');
            }
            const data = await response.json();
            return data.products;
        } catch (error) {
            if (error instanceof Error) {
                return rejectWithValue(error.message);
            }
            return rejectWithValue('An unknown error occurred');
        }
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
            })
            .addCase(updateCart.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateCart.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = state.items.map(item => {
                    const updatedProduct = action.payload.find(p => p.id === item.id);
                    return updatedProduct ? { ...item, ...updatedProduct } : item;
                });
            })
            .addCase(updateCart.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            });
    }
});

export const selectCartItems = (state: RootState) => state.cart.items;
export const selectCartStatus = (state: RootState) => state.cart.status;
export const selectCartError = (state: RootState) => state.cart.error;

export default cartSlice.reducer;