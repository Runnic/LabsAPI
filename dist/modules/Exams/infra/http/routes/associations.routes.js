"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _AssociationsController = _interopRequireDefault(require("../controllers/AssociationsController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const AssociationsRouter = (0, _express.Router)();
const associationsController = new _AssociationsController.default(); // AssociationsRouter.get('/', associationsController.list)
// AssociationsRouter.get('/:_id', associationsController.listOne)
// AssociationsRouter.get('/:exam_id', associationsController.listByExamId)

AssociationsRouter.post('/', associationsController.create);
AssociationsRouter.delete('/', associationsController.delete);
var _default = AssociationsRouter;
exports.default = _default;