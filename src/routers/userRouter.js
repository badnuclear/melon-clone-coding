import express from "express";
import {
  finishKakaoLogin,
  see,
  startKakaoLogin,
} from "../controllers/userController";

const userRouter = express.Router();

userRouter.get("/:id", see);
userRouter.get("/kakao/start", startKakaoLogin);
userRouter.get("/kakao/finish", finishKakaoLogin);
export default userRouter;
