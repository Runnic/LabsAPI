"use strict";

require("reflect-metadata");

require("express-async-errors");

require("../mongoose");

require("../../containers");

var _express = _interopRequireDefault(require("express"));

var _routes = _interopRequireDefault(require("./routes"));

var _GlobalExceptionHandler = _interopRequireDefault(require("../../Errors/GlobalExceptionHandler"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express.default)();
const port = 8888;
app.use(_express.default.json());
app.use(_routes.default);
app.use(_GlobalExceptionHandler.default);
app.listen(port, () => {
  console.log('🚀 O servidor está online! PORTA:' + port);
});