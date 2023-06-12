import { User } from "../db/models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class userService {
  static async addUser({ id, nickname, password }) {
    // ID 중복 확인
    const idChecked = await User.findByOne({ id });
    if (idChecked) {
      const errorMessage = "사용중인 ID입니다. 다른 ID를 입력해 주세요.";
      return { errorMessage };
    }

    // 닉네임 중복 확인
    const nicknameChecked = await User.findByOne({ nickname });
    if (nicknameChecked) {
      const errorMessage =
        "사용중인 닉네임입니다. 다른 닉네임을 입력해 주세요.";
      return { errorMessage };
    }

    // 비밀번호 해쉬화
    const hashedPassword = await bcrypt.hash(password, 10);

    // id 는 유니크 값 부여
    const newUser = { id, nickname, password: hashedPassword };

    // db에 저장
    try {
      return await User.create({ newUser });
    } catch (error) {
      return error;
    }
  }

  static async getUser({ id, password }) {
    // 이메일 db에 존재 여부 확인
    const user = await User.findByOne({ id });
    if (!user) {
      const errorMessage = "해당 ID는 가입이력이 없습니다.";
      return { errorMessage };
    }

    // 비밀번호 일치 여부 확인
    const correctPasswordHash = user.password;
    const isPasswordCorrect = await bcrypt.compare(
      password,
      correctPasswordHash
    );
    if (!isPasswordCorrect) {
      const errorMessage =
        "비밀번호가 일치하지 않습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    // 로그인 성공 -> JWT 웹 토큰 생성
    const secretKey = process.env.JWT_SECRET_KEY;
    const token = jwt.sign({ _id: user._id }, secretKey);

    // 반환할 loginuser 객체를 위한 변수 설정
    const _id = user._id;
    const nickname = user.nickname;
    const description = user.description;
    const level = user.level;

    const loginUser = {
      token,
      _id,
      nickname,
      description,
      level,
      errorMessage: null,
    };

    return loginUser;
  }

  static async getUserInfo(_id) {
    const user = await User.findByOne({ _id });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!user) {
      const errorMessage = "해당 ID는 가입이력이 없습니다.";
      return { errorMessage };
    }

    return user;
  }

  static async setUser({ _id, toUpdate }) {
    // 업데이트 대상에 name이 있다면, 즉 name 값이 null 이 아니라면 업데이트 진행
    if (toUpdate.nickname) {
      const nicknameChecked = await User.findByOne({
        nickname: toUpdate.nickname,
      });
      if (nicknameChecked) {
        const errorMessage =
          "사용중인 닉네임입니다. 다른 닉네임을 입력해 주세요.";
        return { errorMessage };
      }

      const fieldToUpdate = "nickname";
      const newValue = toUpdate.nickname;
      return await User.update({ _id, fieldToUpdate, newValue });
    } else if (toUpdate.description) {
      const fieldToUpdate = "description";
      const newValue = toUpdate.description;
      return await User.update({ _id, fieldToUpdate, newValue });
    } else if (toUpdate.profile) {
      const fieldToUpdate = "profile";
      const newValue = toUpdate.profile;
      return await User.update({ _id, fieldToUpdate, newValue });
    } else {
      const errorMessage = "정보를 불러오지 못했습니다.";
      return { errorMessage };
    }
  }
}

export { userService };
