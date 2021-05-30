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

let ListLabByNameService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('LabsRepository')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _ILabRepository.default === "undefined" ? Object : _ILabRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class ListLabByNameService {
  constructor(labsRepository) {
    this.labsRepository = labsRepository;
  }

  async execute(name) {
    if (!name) throw new _AppError.default('Nome do laboratório não informado.');
    const lab = await this.labsRepository.listByName(name);
    return lab;
  }

}) || _class) || _class) || _class) || _class);
var _default = ListLabByNameService;
exports.default = _default;