import { createSlice } from '@reduxjs/toolkit';
import { AuthState } from '../interfaces/types';

const initialState: AuthState = {
    user: null,
    token: localStorage.getItem('token'),
    isAuthenticated: !!localStorage.getItem('token'),
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout(state) {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            localStorage.removeItem('token');
        },
        setToken(state, action) {
            state.token = action.payload;
            localStorage.setItem('token', action.payload);
            state.isAuthenticated = true;
        },
        setUser(state, action) {
            state.user = action.payload;
            state.isAuthenticated = true;
        }
    },
});

export const { logout, setToken, setUser } = authSlice.actions;
export default authSlice.reducer;