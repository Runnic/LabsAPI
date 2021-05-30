"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _CreateLabService = _interopRequireDefault(require("../../../services/CreateLabService"));

var _ListLabsService = _interopRequireDefault(require("../../../services/ListLabsService"));

var _DeleteLabsService = _interopRequireDefault(require("../../../services/DeleteLabsService"));

var _UpdateLabsService = _interopRequireDefault(require("../../../services/UpdateLabsService"));

var _ListLabByIDService = _interopRequireDefault(require("../../../services/ListLabByIDService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class LabController {
  async list(req, res) {
    const listLabsService = _tsyringe.container.resolve(_ListLabsService.default);

    const labs = await listLabsService.execute();
    return res.json({
      labs
    });
  }

  async listByID(req, res) {
    const listLabByIDService = _tsyringe.container.resolve(_ListLabByIDService.default);

    const {
      _id
    } = req.params;
    const lab = await listLabByIDService.execute(_id);
    return res.json({
      lab
    });
  }

  async create(req, res) {
    const createLabService = _tsyringe.container.resolve(_CreateLabService.default);

    const labs = await createLabService.execute(req.body);
    return res.json({
      labs
    });
  }

  async delete(req, res) {
    const deleteLabsService = _tsyringe.container.resolve(_DeleteLabsService.default);

    const message = await deleteLabsService.execute(req.body);
    return res.json({
      message
    });
  }

  async update(req, res) {
    const updateLabsService = _tsyringe.container.resolve(_UpdateLabsService.default);

    const labs = await updateLabsService.execute(req.body);
    return res.json({
      labs
    });
  }

}

exports.default = LabController;