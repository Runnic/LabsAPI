import { Router } from 'express'

import ExamsController from '../controllers/ExamsController'

const ExamsRouter = Router()
const examsController = new ExamsController()

ExamsRouter.get('/', examsController.list)

ExamsRouter.get('/:name', examsController.listByName)

ExamsRouter.post('/', examsController.create)

ExamsRouter.delete('/', examsController.delete)

ExamsRouter.patch('/', examsController.update)

ExamsRouter.get('/relacoes/:name', examsController.listLaboratoriesFromExam)

export default ExamsRouter
