"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _IAssociationsRepository = _interopRequireDefault(require("../repositories/IAssociationsRepository"));

var _AppError = _interopRequireDefault(require("../../../shared/Errors/AppError"));

var _dec, _dec2, _dec3, _dec4, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let CreateAssociationService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('AssociationsRepository')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _IAssociationsRepository.default === "undefined" ? Object : _IAssociationsRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class CreateAssociationService {
  constructor(associationsRepository) {
    this.associationsRepository = associationsRepository;
  }

  async execute(data) {
    if (data instanceof Array) {
      const newAssociations = await Promise.all(data.map(async queryAssociation => {
        const associations = await this.associationsRepository.listByExamId(queryAssociation.examId);
        const alreadyExists = associations.filter(association => {
          if (association.labId === queryAssociation.labId) return;
        });
        if (!alreadyExists) return {
          message: `Associação entre ExamID:${queryAssociation.examId} e LabID:${queryAssociation.labId} já existe.`
        };
        const newAssociation = await this.associationsRepository.create(queryAssociation);
        return newAssociation;
      }));
      return newAssociations;
    }

    const associations = await this.associationsRepository.listByExamId(data.examId);
    associations.forEach(association => {
      if (association.labId === data.labId) throw new _AppError.default('Associação já existe.', 409);
    });
    const newAssociation = await this.associationsRepository.create(data);
    return newAssociation;
  }

}) || _class) || _class) || _class) || _class);
var _default = CreateAssociationService;
exports.default = _default;