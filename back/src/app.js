import cors from "cors";
import express from "express";
import { db } from "./db";
import { errorMiddleware } from "./middlewares/errorMiddleware";
import {
  userRouter,
  restaurantRouter,
  parkRouter,
  activityRouter,
  kakaoRouter,
  postRouter,
} from "./routers";

const app = express();
const path = require("path");

// CORS 에러 방지
app.use(cors());

// express 기본 제공 middleware
// express.json(): POST 등의 요청과 함께 오는 json형태의 데이터를 인식하고 핸들링할 수 있게 함.
// express.urlencoded: 주로 Form submit 에 의해 만들어지는 URL-Encoded 형태의 데이터를 인식하고 핸들링할 수 있게 함.
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// 기본 페이지
app.get("/", (req, res) => {
  res.send("안녕하세요");
});

// 이미지 url로 접근 시 처리
app.use(express.static(path.join(__dirname, "uploaded")));

// router, service 구현
app.use("/user", userRouter);
app.use("/restaurant", restaurantRouter);
app.use("/park", parkRouter);
app.use("/activity", activityRouter);
app.use("/kakao", kakaoRouter);
app.use("/post", postRouter);

// 순서 중요 (router 에서 next() 시 아래의 에러 핸들링  middleware로 전달됨)
app.use(errorMiddleware);

export { app };
