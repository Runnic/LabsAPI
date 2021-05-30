"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _AppError = _interopRequireDefault(require("../../../shared/Errors/AppError"));

var _IExamsRepository = _interopRequireDefault(require("../repositories/IExamsRepository"));

var _IAssociationsRepository = _interopRequireDefault(require("../repositories/IAssociationsRepository"));

var _ILabRepository = _interopRequireDefault(require("../../Labs/repositories/ILabRepository"));

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let ListExamByNameService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('ExamsRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('AssociationsRepository')(target, undefined, 1);
}, _dec4 = function (target, key) {
  return (0, _tsyringe.inject)('LabsRepository')(target, undefined, 2);
}, _dec5 = Reflect.metadata("design:type", Function), _dec6 = Reflect.metadata("design:paramtypes", [typeof _IExamsRepository.default === "undefined" ? Object : _IExamsRepository.default, typeof _IAssociationsRepository.default === "undefined" ? Object : _IAssociationsRepository.default, typeof _ILabRepository.default === "undefined" ? Object : _ILabRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = class ListExamByNameService {
  constructor(examsRepository, associationsRepository, labsRepository) {
    this.examsRepository = examsRepository;
    this.associationsRepository = associationsRepository;
    this.labsRepository = labsRepository;
  }

  async execute(name) {
    const exam = await this.examsRepository.listByName(name);
    if (!exam) throw new _AppError.default('Exame não encontrado.', 404);
    const associations = await this.associationsRepository.listByExamId(exam._id);
    if (associations.length <= 0) throw new _AppError.default('Nenhuma relação encontrada com esse exame.', 404);
    const labs = await Promise.all(associations.map(async association => {
      const lab = await this.labsRepository.listById(association.labId);
      return lab;
    }));
    return labs;
  }

}) || _class) || _class) || _class) || _class) || _class) || _class);
var _default = ListExamByNameService;
exports.default = _default;