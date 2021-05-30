"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _path = _interopRequireDefault(require("path"));

var _labs = _interopRequireDefault(require("../../../../modules/Labs/infra/http/routes/labs.routes"));

var _exams = _interopRequireDefault(require("../../../../modules/Exams/infra/http/routes/exams.routes"));

var _associations = _interopRequireDefault(require("../../../../modules/Exams/infra/http/routes/associations.routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const routes = (0, _express.Router)();
routes.use('/laboratorios', _labs.default);
routes.use('/exames', _exams.default);
routes.use('/associacoes', _associations.default);
routes.get('/', (_, res) => res.sendFile(_path.default.join(__dirname, '../index.html')));
var _default = routes;
exports.default = _default;