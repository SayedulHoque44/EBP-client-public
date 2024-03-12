import { baseApi } from '../../api/baseApi';

const BlogManagment = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBlogs: builder.query({
      query: (args) => {

        const params = new URLSearchParams();

        if (args) {
          args.forEach((item) => {
            params.append(item.name, item.value);
          });
        }

        return{
          url: '/blogs',
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
      providesTags:["blogs"]
    }),
    updateSingleBlog:builder.mutation({
      query:({blogId,blogData})=>({
        url:`/blogs/${blogId}`,
        method:"PATCH",
        body:blogData
      }),
      invalidatesTags:["blogs"]
    }),
    createBlog:builder.mutation({
      query:(blogData)=>{

        return{
        url:`/blogs`,
        method:"POST",
        body:blogData
      }},
      invalidatesTags:["blogs"]
    }),

    deleteSingleBlog:builder.mutation({
      query:(blogId)=>({
        url:`/blogs/${blogId}`,
        method:"DELETE",
      }),
      invalidatesTags:["blogs"]
    }),

    getSingleBlog:builder.query({
      query:(blogId)=>({
        url:`/blogs/${blogId}`,
        method:"GET",
      }),
      providesTags:["blogs"]
    }),
  }),
});

export const {
  useGetBlogsQuery,
  useUpdateSingleBlogMutation,
  useCreateBlogMutation,
  useDeleteSingleBlogMutation,
  useGetSingleBlogQuery

 } = BlogManagment;