"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _env = _interopRequireDefault(require("../../../config/env"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const URI = `mongodb+srv://${_env.default.mongodb.user}:${_env.default.mongodb.password}@cluster0.eixmq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

var _default = _mongoose.default.connect(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

exports.default = _default;