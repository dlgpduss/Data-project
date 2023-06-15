import React, { FC, useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardHeader,
  CardContent,
  CardMedia,
  Grid,
  Link,
} from "@mui/material";
import KaKaoParkRoadView from "./KaKaoParkRoadView";
import { Park } from "../../models/park.model";
import { useGetRestaurantDetailDataQuery } from "../../services/restaurantsApi";
import { useSelector } from "react-redux";
import { RootState } from "../../features/configureStore";
import { useGetParkDetailDataQuery } from "../../services/parksApi";

const Rightbar2: FC<any> = ({ Type }: { Type: string }) => {
  const { selectedRestaurantItemId } = useSelector(({ basket }: RootState) => ({
    selectedRestaurantItemId: basket.selectedItemId,
  }));

  const { selectedParkItemId } = useSelector(({ basketPark }: RootState) => ({
    selectedParkItemId: basketPark.selectedItemId,
  }));

  const [spotData, setSpotData] = useState<any>(null);

  const {
    data: RestaurantData,
    isSuccess: RestaurantSuccess,
    isFetching: RestaurantFetching,
  } = useGetRestaurantDetailDataQuery(selectedRestaurantItemId, {
    skip: Type === "park",
  });

  const {
    data: ParkData,
    isSuccess: ParkSuccess,
    isFetching: ParkFetching,
  } = useGetParkDetailDataQuery(selectedParkItemId, {
    skip: Type === "restaurant",
  });

  useEffect(() => {
    if (Type === "restaurant" && !RestaurantFetching && RestaurantSuccess) {
      setSpotData(RestaurantData);
    } else if (Type === "park" && !ParkFetching && ParkSuccess) {
      setSpotData(ParkData);
    }
  }, [RestaurantFetching, RestaurantSuccess, ParkFetching, ParkSuccess]);

  if (Type === "restaurant" && RestaurantFetching) {
    return <div>Restaurant Loading...</div>;
  }

  if (Type === "park" && ParkFetching) {
    return <div>Park Loading...</div>;
  }

  return (
    <Box position="fixed" marginTop={4}>
      <Box
        sx={{
          width: "100%",
          overflow: "auto",
          maxHeight: "85%",
          display: "flex",
          justifyContent: "center",
          maxWidth: 300,
        }}
      >
        <Card
          sx={{
            margin: "auto",
            border: "solid 2px green",
            borderRadius: "10px",
          }}
        >
          <Grid>
            {Type === "restaurant" ? (
              <CardMedia
                component="img"
                height="200"
                src={RestaurantData?.image}
                alt="스팟 이미지"
              />
            ) : (
              <KaKaoParkRoadView spotData={ParkData as Park} />
            )}
          </Grid>

          <Grid item xs={12} md={6}>
            <Link
              href={
                Type === "restaurant"
                  ? `/restaurant/detail/${RestaurantData?._id}`
                  : `/park/detail/${ParkData?._id}`
              }
              sx={{ textDecoration: "none" }}
            >
              {Type === "restaurant" ? (
                <CardHeader
                  title={RestaurantData?.name}
                  subheader={RestaurantData?.category}
                />
              ) : (
                <CardHeader title={ParkData?.name} />
              )}
            </Link>
            <CardContent>
              <Typography variant="body1">
                <img
                  src={require("../../assets/images/phone.png")}
                  alt="Region Icon"
                  style={{
                    width: "13px",
                    height: "13px",
                    verticalAlign: "middle",
                  }}
                />{" "}
                {Type === "restaurant" ? RestaurantData?.tel : ParkData?.tel}
              </Typography>
              {Type === "restaurant" && (
                <Typography variant="body1">
                  <img
                    src={require("../../assets/images/category.png")}
                    alt="Region Icon"
                    style={{
                      width: "13px",
                      height: "13px",
                      verticalAlign: "middle",
                    }}
                  />{" "}
                  {RestaurantData?.description}
                </Typography>
              )}
              {Type === "restaurant" && (
                <Typography variant="body1">
                  <img
                    src={require("../../assets/images/information.png")}
                    alt="Region Icon"
                    style={{
                      width: "13px",
                      height: "13px",
                      verticalAlign: "middle",
                    }}
                  />{" "}
                  {RestaurantData?.reservation ? "예약가능" : "예약불가능"}
                </Typography>
              )}
              <Typography variant="body1" gutterBottom>
                <img
                  src={require("../../assets/images/region.png")}
                  alt="Region Icon"
                  style={{
                    width: "13px",
                    height: "13px",
                    verticalAlign: "middle",
                  }}
                />{" "}
                {Type === "restaurant"
                  ? RestaurantData?.address
                  : ParkData?.address}
              </Typography>
            </CardContent>
          </Grid>
        </Card>
      </Box>
    </Box>
  );
};

export default Rightbar2;