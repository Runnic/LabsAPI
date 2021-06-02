import { Router } from 'express'

import AssociationsController from '../controllers/AssociationsController'

import validateDeleteAssociationRequest from '../middlewares/validateDeleteAssociationRequest'
import validateCreateAssociationRequest from '../middlewares/validateCreateAssociationRequest'
import validadeCreateAssociationFromExamRequest from '../middlewares/validateCreateAssociationFromExamRequest'
import validadeCreateAssociationFromLabRequest from '../middlewares/validateCreateAssociationFromLabRequest'

const AssociationsRouter = Router()
const associationsController = new AssociationsController()

AssociationsRouter.get('/', associationsController.list)

// AssociationsRouter.get('/:_id', associationsController.listOne)

// AssociationsRouter.get('/:exam_id', associationsController.listByExamId)

AssociationsRouter.post(
  '/',
  validateCreateAssociationRequest,
  associationsController.create
)

AssociationsRouter.post(
  '/exame/:_id',
  validadeCreateAssociationFromExamRequest,
  associationsController.createFromExam
)

AssociationsRouter.post(
  '/laboratorio/:_id',
  validadeCreateAssociationFromLabRequest,
  associationsController.createFromLab
)

AssociationsRouter.delete(
  '/',
  validateDeleteAssociationRequest,
  associationsController.delete
)

export default AssociationsRouter
