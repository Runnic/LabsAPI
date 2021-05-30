"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _AppError = _interopRequireDefault(require("../../../shared/Errors/AppError"));

var _IExamsRepository = _interopRequireDefault(require("../repositories/IExamsRepository"));

var _dec, _dec2, _dec3, _dec4, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let DeleteExamService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('ExamsRepository')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _IExamsRepository.default === "undefined" ? Object : _IExamsRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class DeleteExamService {
  constructor(examsRepository) {
    this.examsRepository = examsRepository;
  }

  async execute(data) {
    if (data instanceof Array) {
      let count = 0;
      await Promise.all(data.map(async queryExam => {
        if (queryExam._id.length === 24) {
          const nModified = await this.examsRepository.delete(queryExam._id);
          if (nModified > 0) count += 1;
        }
      }));
      return `${count} exames removidos.`;
    }

    if (data._id.length !== 24) throw new _AppError.default('ID inválido.');
    const nModified = await this.examsRepository.delete(data._id);
    if (nModified <= 0) throw new _AppError.default('Exame não encontrado.', 404);
    return 'Exame removido.';
  }

}) || _class) || _class) || _class) || _class);
var _default = DeleteExamService;
exports.default = _default;