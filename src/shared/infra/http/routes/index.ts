import { Router, Response } from 'express'
import path from 'path'

import LabsRouter from '@modules/Labs/infra/http/routes/labs.routes'
import ExamsRouter from '@modules/Exams/infra/http/routes/exams.routes'
import AssociationsRouter from '@modules/Exams/infra/http/routes/associations.routes'

const routes = Router()

routes.use('/laboratorios', LabsRouter)
routes.use('/exames', ExamsRouter)
routes.use('/associacoes', AssociationsRouter)

routes.get('/', (_, res: Response) =>
  res.sendFile(path.join(__dirname, '../index.html'))
)

export default routes
