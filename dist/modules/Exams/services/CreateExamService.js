"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _IExamsRepository = _interopRequireDefault(require("../repositories/IExamsRepository"));

var _AppError = _interopRequireDefault(require("../../../shared/Errors/AppError"));

var _dec, _dec2, _dec3, _dec4, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let CreateExamService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('ExamsRepository')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _IExamsRepository.default === "undefined" ? Object : _IExamsRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class CreateExamService {
  constructor(examsRepository) {
    this.examsRepository = examsRepository;
  }

  async execute(data) {
    if (data instanceof Array) {
      const newExams = await Promise.all(data.map(async queryExam => {
        const exam = await this.examsRepository.listByName(queryExam.name);
        if (exam) return {
          message: `Exame \'${queryExam.name}\' já existe.`
        };
        const newExam = await this.examsRepository.create(queryExam);
        return newExam;
      }));
      return newExams;
    }

    const exam = await this.examsRepository.listByName(data.name);
    if (exam) throw new _AppError.default('Este exame já existe.', 409);
    const newExam = await this.examsRepository.create(data);
    return newExam;
  }

}) || _class) || _class) || _class) || _class);
var _default = CreateExamService;
exports.default = _default;