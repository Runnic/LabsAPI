"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Associations = _interopRequireDefault(require("../entities/Associations"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class AssociationRepository {
  constructor() {
    this.mongooseRepository = void 0;
    this.mongooseRepository = _Associations.default;
  }

  async list() {
    const associationArray = await this.mongooseRepository.find();
    return associationArray;
  }

  async listOne(_id) {
    const association = await this.mongooseRepository.findOne({
      _id
    });
    return association;
  }

  async listByExamId(examId) {
    const associationsList = await this.mongooseRepository.find({
      examId
    });
    return associationsList;
  }

  async create({
    examId,
    labId
  }) {
    const newAssociation = await this.mongooseRepository.create({
      examId,
      labId
    });
    return newAssociation;
  }

  async delete(_id) {
    const {
      ok
    } = await this.mongooseRepository.deleteOne({
      _id
    });
    return ok;
  }

}

exports.default = AssociationRepository;