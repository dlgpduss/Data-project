import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { apiSlice } from "./authApi";
import { API_BASE_URL } from "./constant";

export const profileApi = createApi({
  reducerPath: "profileApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
  }),
  endpoints: (builder) => ({
    getUserFeed: builder.query<any, any>({
      query: ({ _id, page }: any) => ({
        url: `/post/user/${_id}?page=${page}`,
        method: "GET",
        params: { _id: _id },
      }),
    }),
    getUserComment: builder.query<any, any>({
      query: ({ _id, page }: any) => ({
        url: `/post/user/${_id}/comment?page=${page}`,
        method: "GET",
        params: { _id: _id },
      }),
    }),
  }),
});

export const { useGetUserFeedQuery, useGetUserCommentQuery } = profileApi;

export const profileMutationApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    changeUserInfo: builder.mutation({
      query: (body: { nickname?: string; description?: string }) => ({
        url: `/user`,
        method: "PUT",
        body,
      }),
    }),
    changeUserImage: builder.mutation({
      query: (file: any) => {
        const formData = new FormData();
        formData.append("file", file);

        return {
          url: "/user",
          method: "PATCH",
          body: formData,
        };
      },
    }),
    getRankList: builder.query({
      query: () => ({
        url: `/user/rank`,
      }),
    }),
  }),
});

export const {
  useChangeUserInfoMutation,
  useChangeUserImageMutation,
  useGetRankListQuery,
} = profileMutationApi;
