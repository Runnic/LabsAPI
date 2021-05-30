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

let DeleteLabsService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('LabsRepository')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _ILabRepository.default === "undefined" ? Object : _ILabRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class DeleteLabsService {
  constructor(labsRepository) {
    this.labsRepository = labsRepository;
  }

  async execute(data) {
    if (data instanceof Array) {
      let count = 0;
      await Promise.all(data.map(async queryLab => {
        if (queryLab._id.length === 24) {
          const nModified = await this.labsRepository.deleteOne(queryLab._id);
          if (nModified > 0) count += 1;
        }
      }));
      return `${count} laboratórios removidos.`;
    }

    if (data._id.length !== 24) throw new _AppError.default('ID inválido.');
    const nModified = await this.labsRepository.deleteOne(data._id);

    if (nModified <= 0) {
      throw new _AppError.default('Nenhum laboratório encontrado.', 404);
    }

    return `Laboratório removido.`;
  }

}) || _class) || _class) || _class) || _class);
var _default = DeleteLabsService;
exports.default = _default;