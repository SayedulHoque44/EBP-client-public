import { baseApi } from '../../api/baseApi';

const UserManagment = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSingleUser: builder.query({
      query: (userId) => ({
        url: `/users/${userId}`,
        method: 'GET',
      }),
      transformResponse:(response)=>{
        return response?.data
      },
      providesTags:["singleUser"]
    }),

    getAllUsers: builder.query({
      query: (args) => {


        const params = new URLSearchParams();

        if (args) {
          args.forEach((item) => {
            params.append(item.name, item.value);
          });
        }
        return{
          url: `/users`,
          method: 'GET',
          params: params,
        }
      },
      transformResponse:(response)=>{
    
        return {
          result:response.data.result,
          meta:response.data.meta
        }
      },
      providesTags:["users"]
    }),

    updateSingleUser:builder.mutation({
      query:({userId,userData})=>({
        url:`/users/${userId}`,
        method:"PATCH",
        body:userData
      }),
      invalidatesTags:["users","singleUser"]
    }),

    updateUserCourseTime:builder.mutation({
      query:(courseTimeData)=>({
        url:`/courseTimes`,
        method:"POST",
        body:courseTimeData
      }),
      invalidatesTags:["singleUser"]
    }),

    deleteSingleUser:builder.mutation({
      query:(userId)=>({
        url:`/users/${userId}`,
        method:"DELETE",
      }),
      invalidatesTags:["users"]
    }),

    LogOutAllDevices:builder.mutation({
      query:()=>({
        url:`/users/device/deleteDevices`,
        method:"PATCH",
      }),
      invalidatesTags:["users"]
    }),

    deleteUserCourseTime:builder.mutation({
      query:(courseId)=>({
        url:`/courseTimes/${courseId}`,
        method:"DELETE",
      }),
      invalidatesTags:["singleUser"]
    })
  }),
});

export const {
  useGetSingleUserQuery,
  useGetAllUsersQuery,
  useUpdateSingleUserMutation,
  useUpdateUserCourseTimeMutation ,
  useDeleteUserCourseTimeMutation,
  useDeleteSingleUserMutation,
  useLogOutAllDevicesMutation
} = UserManagment;