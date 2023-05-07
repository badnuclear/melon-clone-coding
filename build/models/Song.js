"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var songSchema = new _mongoose["default"].Schema({
  title: {
    type: String,
    required: true
  },
  artist: {
    type: String,
    required: true
  },
  coverImg: {
    type: String,
    required: true
  },
  views: {
    type: Number
  }
});

var Song = _mongoose["default"].model("Song", songSchema);

var _default = Song;
exports["default"] = _default;