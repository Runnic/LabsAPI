"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _LabController = _interopRequireDefault(require("../controllers/LabController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const LabsRouter = (0, _express.Router)();
const labController = new _LabController.default();
LabsRouter.get('/', labController.list);
LabsRouter.get('/:_id', labController.listByID);
LabsRouter.post('/', labController.create);
LabsRouter.delete('/', labController.delete);
LabsRouter.patch('/', labController.update);
var _default = LabsRouter;
exports.default = _default;