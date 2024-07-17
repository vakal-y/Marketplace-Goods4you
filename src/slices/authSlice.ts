import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AuthState, User } from '../interfaces/types';

const initialState: AuthState = {
    user: null,
    token: localStorage.getItem('token'),
    status: 'idle',
    error: null,
    isAuthenticated: false,
};

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async ({ username, password }: { username: string, password: string }) => {
        const response = await fetch('https://dummyjson.com/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password, expiresInMins: 30 })
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Failed to login');
        }
        return data as { user: User; token: string };
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout(state) {
            state.user = null;
            state.token = null;
            localStorage.removeItem('token');
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user = action.payload.user;
                state.token = action.payload.token;
                localStorage.setItem('token', action.payload.token);
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message ?? null;
            });
    }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;