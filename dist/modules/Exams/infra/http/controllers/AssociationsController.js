"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _CreateAssociationService = _interopRequireDefault(require("../../../services/CreateAssociationService"));

var _DeleteAssociationService = _interopRequireDefault(require("../../../services/DeleteAssociationService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import ListAssociationsService from '@modules/Exams/services/ListAssociationsService'
// import ListOneAssociationService from '@modules/Exams/services/ListOneAssociationService'
class AssociationsController {
  // async list(req: Request, res: Response) {
  //   const listAssociationsService = container.resolve(ListAssociationsService)
  //   const associations = await listAssociationsService.execute()
  //   return res.json({ associations })
  // }
  // async listOne(req: Request, res: Response) {
  //   const listOneAssociationService = container.resolve(
  //     ListOneAssociationService
  //   )
  //   const { _id } = req.params
  //   const association = await listOneAssociationService.execute(_id)
  //   return res.json({ association })
  // }
  async create(req, res) {
    const createAssociationService = _tsyringe.container.resolve(_CreateAssociationService.default);

    const newAssociation = await createAssociationService.execute(req.body);
    return res.json({
      newAssociation
    });
  }

  async delete(req, res) {
    const deleteAssociationService = _tsyringe.container.resolve(_DeleteAssociationService.default);

    const message = await deleteAssociationService.execute(req.body);
    return res.json({
      message
    });
  }

}

exports.default = AssociationsController;