import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { userService } from "../services/userService";

const userRouter = Router();

userRouter.post("/register", async function (req, res, next) {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }
    // req (request) 에서 데이터 가져오기
    const id = req.body.id;
    const password = req.body.password;
    const nickname = req.body.nickname;

    // 위 데이터를 유저 db에 추가하기
    const newUser = await userService.addUser({
      id,
      password,
      nickname,
    });

    if (newUser.errorMessage) {
      throw new Error(newUser.errorMessage);
    }

    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
});

userRouter.post("/login", async function (req, res, next) {
  try {
    // req (request) 에서 데이터 가져오기
    const id = req.body.id;
    const password = req.body.password;

    // 위 데이터를 이용하여 유저 db에서 유저 찾기
    const user = await userService.getUser({ id, password });

    if (user.errorMessage) {
      throw new Error(user.errorMessage);
    }

    res.status(200).send(user);
  } catch (error) {
    next(error);
  }
});

userRouter.get("/current", login_required, async function (req, res, next) {
  try {
    // jwt토큰에서 추출된 사용자 id를 가지고 db에서 사용자 정보를 찾음.
    const _id = req.currentUserId;
    const currentUserInfo = await userService.getUserInfo(_id);

    if (currentUserInfo.errorMessage) {
      throw new Error(currentUserInfo.errorMessage);
    }

    res.status(200).send(currentUserInfo);
  } catch (error) {
    next(error);
  }
});

userRouter.get(
  "/:_id",
  //   login_required,
  async function (req, res, next) {
    try {
      const _id = req.params._id;
      const currentUserInfo = await userService.getUserInfo(_id);

      if (currentUserInfo.errorMessage) {
        throw new Error(currentUserInfo.errorMessage);
      }

      res.status(200).send(currentUserInfo);
    } catch (error) {
      next(error);
    }
  }
);

// userRouter.get(
//   "/userlist",
//   login_required,
//   async function (req, res, next) {
//     try {
//       // 전체 사용자 목록을 얻음
//       const users = await userService.getUsers();
//       res.status(200).send(users);
//     } catch (error) {
//       next(error);
//     }
//   }
// );

// userRouter.put(
//   "/users/:id",
//   login_required,
//   async function (req, res, next) {
//     try {
//       // URI로부터 사용자 id를 추출함.
//       const user_id = req.params.id;
//       // body data 로부터 업데이트할 사용자 정보를 추출함.
//       const name = req.body.name ?? null;
//       const email = req.body.email ?? null;
//       const password = req.body.password ?? null;
//       const description = req.body.description ?? null;

//       const toUpdate = { name, email, password, description };

//       // 해당 사용자 아이디로 사용자 정보를 db에서 찾아 업데이트함. 업데이트 요소가 없을 시 생략함
//       const updatedUser = await userService.setUser({ user_id, toUpdate });

//       if (updatedUser.errorMessage) {
//         throw new Error(updatedUser.errorMessage);
//       }

//       res.status(200).json(updatedUser);
//     } catch (error) {
//       next(error);
//     }
//   }
// );

// jwt 토큰 기능 확인용, 삭제해도 되는 라우터임.
userRouter.get("/afterlogin", function (req, res, next) {
  res
    .status(200)
    .send(
      `안녕하세요 ${req.currentUserId}님, jwt 웹 토큰 기능 정상 작동 중입니다.`
    );
});

export default userRouter;