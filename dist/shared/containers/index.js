"use strict";

var _tsyringe = require("tsyringe");

var _LabRepository = _interopRequireDefault(require("../../modules/Labs/infra/mongoose/repositories/LabRepository"));

var _ExamsRepository = _interopRequireDefault(require("../../modules/Exams/infra/mongoose/repositories/ExamsRepository"));

var _AssociationsRepository = _interopRequireDefault(require("../../modules/Exams/infra/mongoose/repositories/AssociationsRepository"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_tsyringe.container.registerSingleton('LabsRepository', _LabRepository.default);

_tsyringe.container.registerSingleton('ExamsRepository', _ExamsRepository.default);

_tsyringe.container.registerSingleton('AssociationsRepository', _AssociationsRepository.default);