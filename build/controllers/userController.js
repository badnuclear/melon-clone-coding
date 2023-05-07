"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.see = exports.finishKakaoLogin = exports.startKakaoLogin = void 0;

var _regeneratorRuntime = require("regenerator-runtime");

var _User = _interopRequireDefault(require("../models/User"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

//소셜 카카오 로그인
var startKakaoLogin = function startKakaoLogin(req, res) {
  var baseUrl = "https://kauth.kakao.com/oauth/authorize";
  var config = {
    client_id: process.env.KAKAO_CLIENT,
    redirect_uri: "http://localhost:4000/users/kakao/finish",
    response_type: "code"
  };
  var params = new URLSearchParams(config).toString();
  var finalUrl = "".concat(baseUrl, "?").concat(params);
  return res.redirect(finalUrl);
};

exports.startKakaoLogin = startKakaoLogin;

var finishKakaoLogin = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var baseUrl, config, params, finalUrl, tokenResponse, apiUrl, access_token;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            baseUrl = "https://kauth.kakao.com/oauth/authorize";
            config = {
              grant_type: "authorization_code",
              client_id: process.env.KAKAO_CLIENT,
              redirect_uri: "http://localhost:4000/users/kakao/finish",
              code: req.query.code
            };
            params = new URLSearchParams(config).toString();
            finalUrl = "".concat(baseUrl, "?").concat(params); //토큰 response

            _context.next = 6;
            return fetch(finalUrl, {
              method: "POST"
            });

          case 6:
            _context.next = 8;
            return _context.sent.json();

          case 8:
            tokenResponse = _context.sent;

            if ("access_token" in tokenResponse) {
              apiUrl = "https://kapi.kakao.com";
              access_token = tokenResponse.access_token;
            }

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function finishKakaoLogin(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.finishKakaoLogin = finishKakaoLogin;

var see = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var id, user;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            id = req.params.id;
            _context2.next = 3;
            return _User["default"].findById(id).populate({
              path: "playlist",
              populate: {
                path: "owner",
                model: "User"
              }
            });

          case 3:
            user = _context2.sent;

            if (user) {
              _context2.next = 6;
              break;
            }

            return _context2.abrupt("return", res.status(404).render("404", {
              pageTitle: "유져를 찾지 못했습니다."
            }));

          case 6:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function see(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.see = see;