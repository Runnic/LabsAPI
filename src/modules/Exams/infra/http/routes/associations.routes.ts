import { Router } from 'express'

import AssociationsController from '../controllers/AssociationsController'

const AssociationsRouter = Router()
const associationsController = new AssociationsController()

AssociationsRouter.get('/', associationsController.list)

// AssociationsRouter.get('/:_id', associationsController.listOne)

// AssociationsRouter.get('/:exam_id', associationsController.listByExamId)

AssociationsRouter.post('/', associationsController.create)

AssociationsRouter.delete('/', associationsController.delete)

export default AssociationsRouter
