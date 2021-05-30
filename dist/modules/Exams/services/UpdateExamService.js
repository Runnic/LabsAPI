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

let UpdateExamService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('ExamsRepository')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _IExamsRepository.default === "undefined" ? Object : _IExamsRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class UpdateExamService {
  constructor(examsRepository) {
    this.examsRepository = examsRepository;
  }

  async execute(data) {
    if (data instanceof Array) {
      const exams = await Promise.all(data.map(async queryExam => {
        if (queryExam._id.length !== 24) return {
          message: `ExamID: ${queryExam._id} é inválido.`
        };

        if (queryExam.status) {
          if (!(queryExam.status === 'Ativo' || queryExam.status === 'Inativo')) return {
            message: `ExamID: ${queryExam._id}, alteração de status inválido.`
          };
        }

        if (queryExam.type) {
          if (!(queryExam.type === 'Análise Clínica' || queryExam.type === 'Imagem')) return {
            message: `ExamID: ${queryExam._id}, alteração de tipo inválido.`
          };
        }

        const matchedLabs = await this.examsRepository.update(queryExam);
        if (matchedLabs <= 0) return {
          message: `ExamID: ${queryExam._id} não encontrado.`
        };
        const lab = await this.examsRepository.listById(queryExam._id);
        return lab;
      }));
      return exams;
    }

    if (data._id.length !== 24) throw new _AppError.default('ID inválido.');
    const n = await this.examsRepository.update(data);
    if (n <= 0) throw new _AppError.default('Exame não encontrado.', 404);
    const exam = await this.examsRepository.listById(data._id);
    return exam;
  }

}) || _class) || _class) || _class) || _class);
var _default = UpdateExamService;
exports.default = _default;