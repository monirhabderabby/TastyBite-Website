import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
export const checkoutApi = createApi({
    reducerPath: 'checkoutApi',
    baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
    endpoints: (builder) => ({
        checkout: builder.mutation({
            query: (body) => ({
                url: '/project/checkout',
                method: 'POST',
                body,
            }),
        }),
    }),
});

export const { useCheckoutMutation } = checkoutApi;