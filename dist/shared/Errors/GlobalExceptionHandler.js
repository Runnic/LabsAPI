"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = GlobalExceptionHandler;

var _express = require("express");

var _AppError = _interopRequireDefault(require("./AppError"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function GlobalExceptionHandler(error, __, res, _) {
  if (error instanceof _AppError.default) {
    return res.status(error.statusCode).json({
      message: error.message
    });
  }

  console.error(error);
  return _express.response.status(500).json({
    message: 'Internal Server Error'
  });
}