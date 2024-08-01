import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Product } from '../interfaces/types';

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com/' }),
    endpoints: (builder) => ({
        getCartByUserId: builder.query<{ products: Product[] }, string>({
            query: (userId) => `carts/user/${userId}`,
        }),
        searchProducts: builder.query<{ products: Product[], total: number }, { q: string, limit: number, skip: number }>({
            query: ({ q, limit, skip }) => `/products/search?q=${q}&limit=${limit}&skip=${skip}`,
        }),
    }),
});

export const { useGetCartByUserIdQuery, useSearchProductsQuery } = apiSlice;