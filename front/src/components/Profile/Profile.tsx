// @ts-nocheck

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../features/AuthReducer";
import Sidebar from "./Sidebar";
import Feed from "./Feed";
import Rightbar from "./RightBar";
import { Box, createTheme, Stack, ThemeProvider } from "@mui/material";
import Navbar from "./Navbar";

const Profile = () => {
  const navigate = useNavigate();
  const user = useSelector(selectCurrentUser);

  useEffect(() => {
    if (!sessionStorage.getItem("user")) {
      navigate("/");
    }
  }, []);

  if (!user) {
    return null;
  }

  return (
    <Box bgcolor={"background.default"} color={"text.primary"}>
      <Navbar />
      <Stack direction="row" spacing={2} justifyContent="space-between">
        <Sidebar />
        <Feed />
        <Rightbar />
      </Stack>
    </Box>
  );
};

export default Profile;