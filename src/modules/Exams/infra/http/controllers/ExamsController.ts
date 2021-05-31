import { Request, Response } from 'express'
import { container } from 'tsyringe'

import CreateExamService from '@modules/Exams/services/CreateExamService'
import ListExamsService from '@modules/Exams/services/ListExamsService'
import ListExamByNameService from '@modules/Exams/services/ListExamByNameService'
import DeleteExamService from '@modules/Exams/services/DeleteExamService'
import UpdateExamService from '@modules/Exams/services/UpdateExamService'
import ListLaboratoriesFromExam from '@modules/Exams/services/ListLaboratoriesFromExam'
import DeleteAllExamsService from '@modules/Exams/services/DeleteAllExamsService'
import ActivateAllExamsService from '@modules/Exams/services/ActivateAllExamsService'

export default class ExamsController {
  async list(req: Request, res: Response): Promise<Response> {
    const listExamsService = container.resolve(ListExamsService)

    const exams = await listExamsService.execute()

    return res.json({ exams })
  }

  async listByName(req: Request, res: Response): Promise<Response> {
    const listExamByNameService = container.resolve(ListExamByNameService)
    const { name } = req.params

    const exam = await listExamByNameService.execute(name)

    return res.json({ exam })
  }

  async listLaboratoriesFromExam(
    req: Request,
    res: Response
  ): Promise<Response> {
    const listLaboratoriesFromExamService = container.resolve(
      ListLaboratoriesFromExam
    )
    const { name } = req.params

    const labsFromExam = await listLaboratoriesFromExamService.execute(name)

    return res.json({ labsFromExam })
  }

  async create(req: Request, res: Response): Promise<Response> {
    const createExamService = container.resolve(CreateExamService)

    const newExam = await createExamService.execute(req.body)

    return res.json({ newExam })
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const deleteExamService = container.resolve(DeleteExamService)

    const message = await deleteExamService.execute(req.body)

    return res.json({ message })
  }

  async update(req: Request, res: Response): Promise<Response> {
    const updateExamService = container.resolve(UpdateExamService)

    const updateLog = await updateExamService.execute(req.body)

    return res.json(updateLog)
  }

  async deleteAll(req: Request, res: Response): Promise<Response> {
    const deleteAllExamsService = container.resolve(DeleteAllExamsService)

    const message = await deleteAllExamsService.execute()

    return res.json({ message })
  }

  async activateAll(req: Request, res: Response): Promise<Response> {
    const activateAllExamsService = container.resolve(ActivateAllExamsService)

    const message = await activateAllExamsService.execute()

    return res.json({ message })
  }
}
