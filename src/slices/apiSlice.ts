import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Product } from '../interfaces/types';

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com/' }),
    endpoints: (builder) => ({
        getCartByUserId: builder.query<{ products: Product[] }, string>({
            query: (userId) => `carts/user/${userId}`,
        }),
    }),
});

export const { useGetCartByUserIdQuery } = apiSlice;