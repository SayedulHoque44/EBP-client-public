import { baseApi } from '../../api/baseApi';

const AuthApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userInfo) => ({
        url: '/users/login',
        method: 'POST',
        body: userInfo,
      }),
    }),
    register: builder.mutation({
      query: (userInfo) => ({
        url: '/users/register',
        method: 'POST',
        body: userInfo,
      }),
    }),
    getMe: builder.mutation({
      query: (userInfo) => ({
        url: '/users/getMe',
        method: 'POST',
        body: userInfo,
      }),
    }),
  }),
});

export const { useLoginMutation,useGetMeMutation ,useRegisterMutation} = AuthApi;