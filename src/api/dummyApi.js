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
      query: ({ q = '', limit = 8, skip = 0, sortBy = 'price', order = 'asc', category = '' }) => {
        if (category) {
          return {
            url: `products/category/${category}`,
            params: { limit, skip, sortBy, order },
          };
        }
        if (q) {
          return {
            url: 'products/search',
            params: { q, limit, skip, sortBy, order },
          };
        }
        return {
          url: 'products',
          params: { limit, skip, sortBy, order },
        };
      },
      providesTags: (result) =>
        result?.products
          ? [
              ...result.products.map((p) => ({ type: 'Products', id: p.id })),
              { type: 'Products', id: 'LIST' },
            ]
          : [{ type: 'Products', id: 'LIST' }],
    }),
    getCategories: builder.query({
      query: () => 'products/categories',
    }),
    getCategoryProducts: builder.query({
      query: ({ category, limit = 100 }) => ({
        url: `products/category/${category}`,
        params: { limit, select: 'brand,price,availabilityStatus' },
      }),
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
    addUser: builder.mutation({
      queryFn: async (payload) => {
        await new Promise((resolve) => setTimeout(resolve, 600));
        return {
          data: {
            id: Date.now(),
            ...payload,
          },
        };
      },
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
  useGetCategoriesQuery,
  useGetCategoryProductsQuery,
  useLazyGetProductsQuery,
  useGetProductByIdQuery,
  useLazyGetProductByIdQuery,
  useLoginMutation,
  useAddUserMutation,
  useLogoutUserMutation,
} = dummyApi;
