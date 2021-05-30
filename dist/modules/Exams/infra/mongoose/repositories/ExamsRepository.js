"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Exams = _interopRequireDefault(require("../entities/Exams"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ExamRepository {
  constructor() {
    this.mongooseRepository = void 0;
    this.mongooseRepository = _Exams.default;
  }

  async list() {
    const examsList = await this.mongooseRepository.find({
      status: 'Ativo'
    });
    return examsList;
  }

  async listById(_id) {
    const exam = await this.mongooseRepository.findById(_id);
    return exam;
  }

  async listByName(name) {
    const exam = await this.mongooseRepository.findOne({
      name,
      status: 'Ativo'
    });
    return exam;
  }

  async create({
    name,
    type
  }) {
    const newExam = await this.mongooseRepository.create({
      name,
      type,
      status: 'Ativo'
    });
    return newExam;
  }

  async delete(_id) {
    const {
      nModified
    } = await this.mongooseRepository.updateOne({
      _id
    }, {
      status: 'Inativo'
    });
    return nModified;
  }

  async update(data) {
    const {
      n
    } = await this.mongooseRepository.updateOne({
      _id: data._id
    }, { ...data
    });
    return n;
  }

}

exports.default = ExamRepository;