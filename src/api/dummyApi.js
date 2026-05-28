// src/app/api/dummyApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const dummyApi = createApi({
  reducerPath: 'dummyApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://dummyjson.com',
  }),
  tagTypes: ['Products', 'User'],
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (params) => ({
        url: 'products',
        params,
      }),
      providesTags: (result) =>
        result?.products
          ? [
              ...result.products.map((p) => ({ type: 'Products', id: p.id })),
              { type: 'Products', id: 'LIST' },
            ]
          : [{ type: 'Products', id: 'LIST' }],
    }),
    getProductById: builder.query({
      query: (id) => `products/${id}`,
    }),
    login: builder.mutation({
      query: ({ username, password }) => ({
        url: 'auth/login',
        method: 'POST',
        body: { username, password },
      }),
    }),
    logoutUser: builder.mutation({
      query: (userId) => ({
        url: `users/${userId}`,
        method: 'PATCH',
        body: { isLoggedOut: true },
      }),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useLazyGetProductsQuery,
  useGetProductByIdQuery,
  useLazyGetProductByIdQuery,
  useLoginMutation,
  useLogoutUserMutation,
} = dummyApi;
