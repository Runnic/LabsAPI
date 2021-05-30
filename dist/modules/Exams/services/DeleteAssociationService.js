"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _AppError = _interopRequireDefault(require("../../../shared/Errors/AppError"));

var _IAssociationsRepository = _interopRequireDefault(require("../repositories/IAssociationsRepository"));

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
      let count = 0;
      await Promise.all(data.map(async queryAssociation => {
        if (queryAssociation._id.length === 24) {
          const ok = await this.associationsRepository.delete(queryAssociation._id);
          if (ok) count += 1;
        }
      }));
      return `${count} associações removidas.`;
    }

    if (data._id.length !== 24) throw new _AppError.default('ID inválido');
    const ok = await this.associationsRepository.delete(data._id);
    if (ok !== 1) throw new _AppError.default('Erro ao excluir associação.');
    return 'Associação removida.';
  }

}) || _class) || _class) || _class) || _class);
var _default = CreateAssociationService;
exports.default = _default;