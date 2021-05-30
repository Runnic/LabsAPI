"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv.default.config();

const envVariables = {
  mongodb: {
    user: process.env.MONGODB_USER,
    password: process.env.MONGODB_PASSWORD
  }
};
var _default = envVariables;
exports.default = _default;