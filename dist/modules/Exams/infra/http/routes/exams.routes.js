"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _ExamsController = _interopRequireDefault(require("../controllers/ExamsController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const ExamsRouter = (0, _express.Router)();
const examsController = new _ExamsController.default();
ExamsRouter.get('/', examsController.list);
ExamsRouter.get('/:name', examsController.listByName);
ExamsRouter.post('/', examsController.create);
ExamsRouter.delete('/', examsController.delete);
ExamsRouter.patch('/', examsController.update);
ExamsRouter.get('/relacoes/:name', examsController.listLaboratoriesFromExam);
var _default = ExamsRouter;
exports.default = _default;