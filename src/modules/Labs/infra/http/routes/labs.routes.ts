import { Router } from 'express'

import LabController from '../controllers/LabController'

const LabsRouter = Router()

const labController = new LabController()

LabsRouter.get('/', labController.list)

LabsRouter.get('/:_id', labController.listByID)

LabsRouter.post('/', labController.create)

LabsRouter.delete('/', labController.delete)

LabsRouter.patch('/', labController.update)

LabsRouter.delete('/delete-all', labController.deleteAll)

LabsRouter.patch('/activate-all', labController.activateAll)

export default LabsRouter
