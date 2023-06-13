import { Box } from "@mui/material";
import React, { useState } from "react";
import FeedCard from "../Community/FeedCard";

import { useGetUserFeedQuery } from "../../services/profileApi";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../features/AuthReducer";
import { RootState } from "../../features/configureStore";

const Feed = () => {
  const user = useSelector(selectCurrentUser);
  const { pageNumber } = useSelector(({ profile }: RootState) => ({
    pageNumber: profile.pageNumber,
  }));

  const {
    data: feedData,
    isSuccess: feedSuccess,
    isError: feedError,
    isLoading: feedLoading,
    isFetching: feedFetching,
  } = useGetUserFeedQuery(
    {
      // @ts-ignore
      _id: user?._id,
      page: pageNumber,
    },
    {
      skip: false,
      refetchOnMountOrArgChange: true,
    }
  );

  // const {
  //   data: commentData,
  //   isSuccess: commentSuccess,
  //   isError: commentError,
  //   isLoading: commentLoading,
  // } = useGetUserCommentQuery(user._id);

  if (feedFetching) {
    return null;
  }

  return (
    <Box flex={4} p={{ xs: 0, md: 2 }}>
      {feedData?.post?.map((item: any) => (
        <FeedCard key={item?._id} data={item} />
      ))}
    </Box>
  );
};

export default Feed;