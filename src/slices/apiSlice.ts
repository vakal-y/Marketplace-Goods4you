import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com/' }),
    endpoints: (builder) => ({
        getCartByUserId: builder.query<any, string>({
            query: (userId) => `carts/user/${userId}`,
        }),
    }),
});

export const { useGetCartByUserIdQuery } = apiSlice;