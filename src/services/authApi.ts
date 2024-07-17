import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://dummyjson.com',
        prepareHeaders: (headers, { getState }) => {
            const token = localStorage.getItem('token');
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        loginUser: builder.mutation<{ token: string }, { username: string, password: string }>({
            query: ({ username, password }) => ({
                url: '/auth/login',
                method: 'POST',
                body: { username, password, expiresInMins: 30 },
            }),
        }),
        getCurrentUser: builder.query<any, void>({
            query: () => '/auth/me',
        }),
    }),
});

export const { useLoginUserMutation, useGetCurrentUserQuery } = authApi;

export default authApi;