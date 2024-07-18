import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { User } from '../interfaces/types';

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://dummyjson.com',
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('token');
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        loginUser: builder.mutation<{ user: User; token: string }, { username: string, password: string }>({
            query: ({ username, password }) => ({
                url: '/auth/login',
                method: 'POST',
                body: { username, password, expiresInMins: 30 },
            }),
        }),
        getCurrentUser: builder.query<User, void>({
            query: () => '/auth/me',
        }),
    }),
});

export const { useLoginUserMutation, useGetCurrentUserQuery } = authApi;

export default authApi;