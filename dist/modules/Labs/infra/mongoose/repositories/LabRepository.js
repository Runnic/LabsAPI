"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Lab = _interopRequireDefault(require("../entities/Lab"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class LabRepository {
  constructor() {
    this.mongooseRepository = void 0;
    this.mongooseRepository = _Lab.default;
  }

  async list() {
    const labs = await this.mongooseRepository.find({
      status: 'Ativo'
    });
    return labs;
  }

  async listById(_id) {
    const lab = await this.mongooseRepository.findById(_id);
    return lab;
  }

  async listByName(name) {
    const lab = await this.mongooseRepository.findOne({
      name
    });
    return lab;
  }

  async create({
    name,
    address
  }) {
    const lab = await this.mongooseRepository.create({
      name,
      address,
      status: 'Ativo'
    });
    return lab;
  }

  async deleteOne(_id) {
    const {
      nModified
    } = await this.mongooseRepository.updateOne({
      _id,
      status: 'Ativo'
    }, {
      status: 'Inativo'
    });
    return nModified;
  }

  async updateOne(data) {
    const {
      n
    } = await this.mongooseRepository.updateOne({
      _id: data._id
    }, { ...data
    });
    return n;
  }

}

exports.default = LabRepository;