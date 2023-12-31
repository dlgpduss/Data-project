import React from "react";
import {
  Typography,
  Card,
  CardHeader,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Checkbox,
} from "@mui/material";
import { useGetRestaurantDetailDataQuery } from "../../services/restaurantsApi";
import { useParams } from "react-router-dom";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import LoadingImage from "../common/Loading";

const RestaurantVeganDetail = () => {
  const { restaurantId } = useParams() as { restaurantId: string };
  const { data, error, isLoading, isFetching, isSuccess } =
    useGetRestaurantDetailDataQuery(restaurantId);

  if (isLoading) {
    return <LoadingImage />;
  }

  return (
    <Card
      sx={{
        maxWidth: 800,
        margin: "auto",
        marginTop: 4,
      }}
    >
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <CardMedia
            component="img"
            height="400"
            src={data?.image}
            alt={data?.name}
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          style={{
            marginTop: "1.5rem",
          }}
        >
          <CardHeader
            title={
              <Typography
                fontWeight="bold"
                sx={{
                  fontSize: {
                    xs: "2vw",
                  },
                  lineHeight: { xs: "2.2vw" },
                  color: "primary.main",
                  whiteSpace: "nowrap",
                  marginTop: "2vw",
                  fontFamily: "NanumSquareExtraBold, sans-serif",
                }}
              >
                <span>{data?.name}</span>
                <Checkbox
                  icon={<FavoriteBorder sx={{ fontSize: "1rem" }} />}
                  checkedIcon={
                    <Favorite sx={{ color: "red", fontSize: "1rem" }} />
                  }
                  disabled={true}
                  /* @ts-ignore */
                  checked={data?.contactCheck}
                />
                <Typography
                  sx={{
                    fontSize: "15px",
                    fontWeight: "blod",
                    marginLeft: "10px",
                  }}
                >
                  현재 {/* @ts-ignore */}
                  {data?.contacts?.filter((item) => item.value === 1).length +
                    "명"}
                  이 찜하고 있어요
                </Typography>
              </Typography>
            }
          />
          <CardContent>
            <Typography
              sx={{
                fontSize: {
                  xs: "1.5vw",
                  lg: "1rem",
                },
                lineHeight: { xs: "2.2vw" },
                color: "info.main",
                whiteSpace: "nowrap",
              }}
            >
              <img
                src={require("../../assets/images/region.png")}
                alt="Region Icon"
                style={{
                  width: "13px",
                  height: "13px",
                  verticalAlign: "middle",
                }}
              />{" "}
              {data?.region}
            </Typography>
            <Typography
              sx={{
                fontSize: {
                  xs: "1.5vw",
                  lg: "1rem",
                },
                lineHeight: { xs: "2.2vw" },
                color: "info.main",
                whiteSpace: "nowrap",
              }}
            >
              <img
                src={require("../../assets/images/category.png")}
                alt="category Icon"
                style={{
                  width: "13px",
                  height: "13px",
                  verticalAlign: "middle",
                }}
              />{" "}
              {data?.category}
            </Typography>

            <Typography
              sx={{
                fontSize: {
                  xs: "1.5vw",
                  lg: "1rem",
                },
                lineHeight: { xs: "2.2vw" },
                color: "info.main",
                whiteSpace: "nowrap",
              }}
            >
              <img
                src={require("../../assets/images/address.png")}
                alt="Address Icon"
                style={{
                  width: "13px",
                  height: "13px",
                  verticalAlign: "middle",
                }}
              />{" "}
              {data?.address}
            </Typography>
            <Typography
              sx={{
                fontSize: {
                  xs: "1.5vw",
                  lg: "1rem",
                },
                lineHeight: { xs: "2.2vw" },
                color: "info.main",
                whiteSpace: "nowrap",
              }}
            >
              <img
                src={require("../../assets/images/phone.png")}
                alt="Phone Icon"
                style={{
                  width: "13px",
                  height: "13px",
                  verticalAlign: "middle",
                }}
              />{" "}
              {data?.tel}
            </Typography>
            <Typography
              sx={{
                fontSize: {
                  xs: "1.5vw",
                  lg: "1rem",
                },
                lineHeight: { xs: "2.2vw" },
                color: "info.main",
                whiteSpace: "nowrap",
              }}
            >
              <img
                src={require("../../assets/images/information.png")}
                alt="Info Icon"
                style={{
                  width: "13px",
                  height: "13px",
                  verticalAlign: "middle",
                }}
              />{" "}
              {data?.reservation ? "예약 가능" : "예약 불가능"}
            </Typography>
            <Typography
              sx={{
                fontSize: {
                  xs: "1.5vw",
                  lg: "1rem",
                },
                lineHeight: { xs: "2.2vw" },
                color: "info.main",
                whiteSpace: "nowrap",
              }}
            >
              <img
                src={require("../../assets/images/food.png")}
                alt="food Icon"
                style={{
                  width: "13px",
                  height: "13px",
                  verticalAlign: "middle",
                }}
              />{" "}
              {data?.description}
            </Typography>
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  );
};

export default RestaurantVeganDetail;
