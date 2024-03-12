import { baseApi } from '../../api/baseApi';

const QNAManagment = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getQNAPdf: builder.query({
      query: () => ({
        url: '/QNAPdf',
        method: 'GET',
      }),
      transformResponse:(res)=>res?.data,
      providesTags:["QNAPdf"]
    }),
    createQNAPdf: builder.mutation({
      query: (pdfInfo) => ({
        url: '/QNAPdf',
        method: 'POST',
        body:pdfInfo
      }),
      invalidatesTags:["QNAPdf"]
    }),

    deleteQNAPdf: builder.mutation({
      query: (pdfId) => ({
        url: `/QNAPdf/${pdfId}`,
        method: 'DELETE',
      }),
      invalidatesTags:["QNAPdf"]
    }),
    
  }),
});

export const { useGetQNAPdfQuery,useDeleteQNAPdfMutation,useCreateQNAPdfMutation } = QNAManagment;