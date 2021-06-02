import { Router } from 'express'

import ExamsController from '../controllers/ExamsController'

import validateCreateExamRequest from '../middlewares/validateCreateExamRequest'
import validateDeleteExamRequest from '../middlewares/validateDeleteExamRequest'
import validateUpdateExamRequest from '../middlewares/validateUpdateExamRequest'

const ExamsRouter = Router()
const examsController = new ExamsController()

ExamsRouter.get('/', examsController.list)

// ExamsRouter.get('/:name', examsController.listByName)

ExamsRouter.post('/', validateCreateExamRequest, examsController.create)

ExamsRouter.delete('/', validateDeleteExamRequest, examsController.delete)

ExamsRouter.patch('/', validateUpdateExamRequest, examsController.update)

ExamsRouter.get('/relacoes/:name', examsController.listLaboratoriesFromExam)

ExamsRouter.delete('/delete-all', examsController.deleteAll)

ExamsRouter.patch('/activate-all', examsController.activateAll)

export default ExamsRouter
