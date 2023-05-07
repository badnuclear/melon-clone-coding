"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.home = exports.getData = void 0;

var _Song = _interopRequireDefault(require("../models/Song"));

var _User = _interopRequireDefault(require("../models/User"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

//유튜브 API
var _require = require("googleleapis"),
    google = _require.google;

var youtube = google.youtube({
  version: "v3",
  auth: precess.env.YOUTUBE_API
}); //인기곡 차트 TOP 10

var getData = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var songChart;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _Song["default"].find({}).sort().limit(10);

          case 2:
            songChart = _context.sent;
            return _context.abrupt("return", res.json(songChart));

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function getData(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.getData = getData;

var home = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            return _context2.abrupt("return", res.render("home", {
              pageTitle: "Home"
            }));

          case 1:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function home(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.home = home;