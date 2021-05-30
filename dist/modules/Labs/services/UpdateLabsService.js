"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _AppError = _interopRequireDefault(require("../../../shared/Errors/AppError"));

var _ILabRepository = _interopRequireDefault(require("../repositories/ILabRepository"));

var _dec, _dec2, _dec3, _dec4, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let UpdateLabsService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('LabsRepository')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _ILabRepository.default === "undefined" ? Object : _ILabRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class UpdateLabsService {
  constructor(labsRepository) {
    this.labsRepository = labsRepository;
  }

  async execute(data) {
    if (data instanceof Array) {
      const labs = await Promise.all(data.map(async queryLab => {
        if (queryLab._id.length !== 24) return {
          message: `LabID: ${queryLab._id} é inválido.`
        };

        if (queryLab.status) {
          if (!(queryLab.status === 'Ativo' || queryLab.status === 'Inativo')) return {
            message: `LabID: ${queryLab._id}, alteração de status inválido.`
          };
        }

        const matchedLabs = await this.labsRepository.updateOne(queryLab);
        if (matchedLabs <= 0) return {
          message: `LabID: ${queryLab._id} não encontrado.`
        };
        const lab = await this.labsRepository.listById(queryLab._id);
        return lab;
      }));
      return labs;
    }

    if (data._id.length !== 24) throw new _AppError.default('ID inválido.');

    if (data.status) {
      if (!(data.status === 'Ativo' || data.status === 'Inativo')) throw new _AppError.default('Status inválido.');
    }

    const matchedLabs = await this.labsRepository.updateOne(data);
    if (matchedLabs <= 0) throw new _AppError.default('Laboratório não encontrado.', 404);
    const lab = await this.labsRepository.listById(data._id);
    return lab;
  }

}) || _class) || _class) || _class) || _class);
var _default = UpdateLabsService;
exports.default = _default;