"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _AppError = _interopRequireDefault(require("../../../shared/Errors/AppError"));

var _tsyringe = require("tsyringe");

var _ILabRepository = _interopRequireDefault(require("../repositories/ILabRepository"));

var _dec, _dec2, _dec3, _dec4, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let CreateLabService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('LabsRepository')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _ILabRepository.default === "undefined" ? Object : _ILabRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class CreateLabService {
  constructor(labsRepository) {
    this.labsRepository = labsRepository;
  }

  async execute(data) {
    if (data instanceof Array) {
      const newLabs = await Promise.all(data.map(async reqLab => {
        const {
          name,
          address
        } = reqLab;
        const lab = await this.labsRepository.listByName(name);
        if (lab) return {
          message: `${lab.name} ja existe.`
        };
        const newLab = await this.labsRepository.create({
          name,
          address
        });
        return newLab;
      }));
      return newLabs;
    }

    const {
      name,
      address
    } = data;
    const lab = await this.labsRepository.listByName(name);
    if (lab) throw new _AppError.default('Laboratório ja existe.', 409);
    const newLab = await this.labsRepository.create({
      name,
      address
    });
    return newLab;
  }

}) || _class) || _class) || _class) || _class);
var _default = CreateLabService;
exports.default = _default;