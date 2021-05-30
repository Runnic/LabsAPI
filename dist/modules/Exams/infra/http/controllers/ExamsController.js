"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _CreateExamService = _interopRequireDefault(require("../../../services/CreateExamService"));

var _ListExamsService = _interopRequireDefault(require("../../../services/ListExamsService"));

var _ListExamByNameService = _interopRequireDefault(require("../../../services/ListExamByNameService"));

var _DeleteExamService = _interopRequireDefault(require("../../../services/DeleteExamService"));

var _UpdateExamService = _interopRequireDefault(require("../../../services/UpdateExamService"));

var _ListLaboratoriesFromExam = _interopRequireDefault(require("../../../services/ListLaboratoriesFromExam"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ExamsController {
  async list(req, res) {
    const listExamsService = _tsyringe.container.resolve(_ListExamsService.default);

    const exams = await listExamsService.execute();
    return res.json({
      exams
    });
  }

  async listByName(req, res) {
    const listExamByNameService = _tsyringe.container.resolve(_ListExamByNameService.default);

    const {
      name
    } = req.params;
    const exam = await listExamByNameService.execute(name);
    return res.json({
      exam
    });
  }

  async listLaboratoriesFromExam(req, res) {
    const listLaboratoriesFromExamService = _tsyringe.container.resolve(_ListLaboratoriesFromExam.default);

    const {
      name
    } = req.params;
    const labsFromExam = await listLaboratoriesFromExamService.execute(name);
    return res.json({
      labsFromExam
    });
  }

  async create(req, res) {
    const createExamService = _tsyringe.container.resolve(_CreateExamService.default);

    const newExam = await createExamService.execute(req.body);
    return res.json({
      newExam
    });
  }

  async delete(req, res) {
    const deleteExamService = _tsyringe.container.resolve(_DeleteExamService.default);

    const message = await deleteExamService.execute(req.body);
    return res.json({
      message
    });
  }

  async update(req, res) {
    const updateExamService = _tsyringe.container.resolve(_UpdateExamService.default);

    const exam = await updateExamService.execute(req.body);
    return res.json({
      exam
    });
  }

}

exports.default = ExamsController;