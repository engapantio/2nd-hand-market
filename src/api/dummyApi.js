import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const dummyApi = createApi({
  reducerPath: 'dummyApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://dummyjson.com/',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.accessToken;

      headers.set('Content-Type', 'application/json');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Auth', 'Products', 'Product', 'Categories', 'Users'],
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: 'auth/login',
        method: 'POST',
        body: { ...credentials, expiresInMins: 30 },
        credentials: 'include',
      }),
      invalidatesTags: ['Auth'],
    }),
    getMe: builder.query({
      query: () => ({
        url: 'auth/me',
        method: 'GET',
        credentials: 'include',
      }),
      providesTags: ['Auth'],
    }),
    getProducts: builder.query({
      query: ({ limit = 12, skip = 0, sortBy, order, select } = {}) => {
        const params = new URLSearchParams();
        params.set('limit', String(limit));
        params.set('skip', String(skip));

        if (sortBy) {
          params.set('sortBy', sortBy);
        }
        if (order) {
          params.set('order', order);
        }
        if (select) {
          params.set('select', select);
        }
        return `products?${params.toString()}`;
      },
      providesTags: ['Products'],
    }),
    getProductById: builder.query({
      query: (id) => `products/${id}`,
      providesTags: (result, error, id) => [{ type: 'Product', id }],
    }),
    searchProducts: builder.query({
      query: ({ q, limit = 12, skip = 0 }) => {
        const params = new URLSearchParams();
        params.set('q', q);
        params.set('limit', String(limit));
        params.set('skip', String(skip));
        return `products/search?${params.toString()}`;
      },
      providesTags: ['Products'],
    }),

    getCategories: builder.query({
      query: () => 'products/categories',
      providedTags: ['Categories'],
    }),
    getProductsByCategory: builder.query({
      query: ({ category, limit = 12, skip = 0 }) => {
        const params = new URLSearchParams();
        params.set('limit', String(limit));
        params.set('skip', String(skip));
        return `products/category/${category}?${params.toString()}`;
      },
      providesTags: ['Products'],
    }),
    addProduct: builder.mutation({
      query: (body) => ({
        url: 'products/add',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Products'],
    }),
    updateProduct: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `products/${id}`,
        method: 'PATCH',
        body: patch,
      }),
      invalidatesTags: (result, error, { id }) => ['Products', { type: 'Product', id }],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `products/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Products'],
    }),
    addUser: builder.mutation({
      query: (body) => ({
        url: 'users/add',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Users'],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useSearchProductQuery,
  useGetCategoriesQuery,
  useGetProductsByCategoryQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useLoginMutation,
  useGetMeQuery,
  useAddUserMutation,
} = dummyApi;
