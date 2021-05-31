import { Router, Response } from 'express'
import appRoot from 'app-root-path'
import LabsRouter from '@modules/Labs/infra/http/routes/labs.routes'
import ExamsRouter from '@modules/Exams/infra/http/routes/exams.routes'
import AssociationsRouter from '@modules/Exams/infra/http/routes/associations.routes'

const routes = Router()

routes.use('/laboratorios', LabsRouter)
routes.use('/exames', ExamsRouter)
routes.use('/associacoes', AssociationsRouter)

routes.get('/insomnia-download', (_, res: Response) => {
  res.download(appRoot + '/public/docs/insomnia.json')
})

export default routes
