"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _IAssociationsRepository = _interopRequireDefault(require("../repositories/IAssociationsRepository"));

var _dec, _dec2, _dec3, _dec4, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let ListAssociationsService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('AssociationsRepository')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _IAssociationsRepository.default === "undefined" ? Object : _IAssociationsRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class ListAssociationsService {
  constructor(associationsRepository) {
    this.associationsRepository = associationsRepository;
  }

  async execute() {
    const labsArray = await this.associationsRepository.list();
    return labsArray;
  }

}) || _class) || _class) || _class) || _class);
var _default = ListAssociationsService;
exports.default = _default;