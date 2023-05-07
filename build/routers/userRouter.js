"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _userController = require("../controllers/userController");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var userRouter = _express["default"].Router();

userRouter.get("/:id", _userController.see);
userRouter.get("/kakao/start", _userController.startKakaoLogin);
userRouter.get("/kakao/finish", _userController.finishKakaoLogin);
var _default = userRouter;
exports["default"] = _default;