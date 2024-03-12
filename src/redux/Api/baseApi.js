import {
  createApi,
  fetchBaseQuery
} from '@reduxjs/toolkit/query/react';
import toast from 'react-hot-toast';
import { logout } from '../Features/Auth/authSlice';


  
  const baseQuery = fetchBaseQuery({
    baseUrl: 'https://patente-server.vercel.app/api/',
    // baseUrl: 'http://localhost:3001/api/',
    // credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
  
      if (token) {
        headers.set('authorization', `${token}`);
      }
  
      return headers;
    },
  });
  
  const baseQueryWithRefreshToken = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);
  

    if (result?.error?.status === 403 || result?.error?.status === 401) {
      toast.error(result.error.data.message);
      api.dispatch(logout())
    }
   
  
    return result;
  };
  
  export const baseApi = createApi({
    reducerPath: 'baseApi',
    baseQuery: baseQueryWithRefreshToken,
    tagTypes: ['users', "singleUser", 'QNAPdf','blogs'],
    endpoints: () => ({}),
  });