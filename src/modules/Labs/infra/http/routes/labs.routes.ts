import { Router } from 'express'

import LabController from '../controllers/LabController'

import validateCreateLabRequest from '../middlewares/validateCreateLabRequest'
import validateDeleteLabRequest from '../middlewares/validateDeleteLabRequest'
import validateUpdateLabRequest from '../middlewares/validateUpdateLabRequest'

const LabsRouter = Router()

const labController = new LabController()

LabsRouter.get('/', labController.list)

LabsRouter.post('/', validateCreateLabRequest, labController.create)

LabsRouter.delete('/', validateDeleteLabRequest, labController.delete)

LabsRouter.patch('/', validateUpdateLabRequest, labController.update)

LabsRouter.delete('/delete-all', labController.deleteAll)

LabsRouter.patch('/activate-all', labController.activateAll)

LabsRouter.get('/relacoes/:labName', labController.listExamsFromLab)

export default LabsRouter
