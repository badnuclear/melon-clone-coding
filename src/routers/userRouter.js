import express from "express";
import {
  finishKakaoLogin,
  see,
  startKakaoLogin,
  logout,
} from "../controllers/userController";

const userRouter = express.Router();

userRouter.get("/logout", logout);
userRouter.get("/:id", see);
userRouter.get("/kakao/start", startKakaoLogin);
userRouter.get("/kakao/finish", finishKakaoLogin);
export default userRouter;
