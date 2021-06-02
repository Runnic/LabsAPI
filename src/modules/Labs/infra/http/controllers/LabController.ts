import { Request, Response } from 'express'
import { container } from 'tsyringe'

import CreateLabService from '@modules/Labs/services/CreateLabService'
import ListLabsService from '@modules/Labs/services/ListLabsService'
import DeleteLabsService from '@modules/Labs/services/DeleteLabsService'
import UpdateLabsService from '@modules/Labs/services/UpdateLabsService'
import ListExamsFromLabService from '@modules/Labs/services/ListExamsFromLabService'
import DeleteAllLabsService from '@modules/Labs/services/DeleteAllLabsService'
import ActivateAllLabsService from '@modules/Labs/services/ActivateAllLabsService'
export default class LabController {
  async list(_: Request, res: Response): Promise<Response> {
    const listLabsService = container.resolve(ListLabsService)

    const labs = await listLabsService.execute()

    return res.json({ labs })
  }

  async listExamsFromLab(req: Request, res: Response): Promise<Response> {
    const listExamsFromLabService = container.resolve(ListExamsFromLabService)
    const { labName } = req.params

    const lab = await listExamsFromLabService.execute(labName)

    return res.json({ lab })
  }

  async create(req: Request, res: Response): Promise<Response> {
    const createLabService = container.resolve(CreateLabService)

    const labs = await createLabService.execute(req.body)

    return res.json({ labs })
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const deleteLabsService = container.resolve(DeleteLabsService)

    const deleteLog = await deleteLabsService.execute(req.body)

    return res.json(deleteLog)
  }

  async update(req: Request, res: Response): Promise<Response> {
    const updateLabsService = container.resolve(UpdateLabsService)

    const updateLog = await updateLabsService.execute(req.body)

    return res.json(updateLog)
  }

  async deleteAll(_: Request, res: Response): Promise<Response> {
    const deleteAllLabsService = container.resolve(DeleteAllLabsService)

    const message = await deleteAllLabsService.execute()

    return res.json({ message })
  }

  async activateAll(_: Request, res: Response): Promise<Response> {
    const activateAllLabsService = container.resolve(ActivateAllLabsService)

    const message = await activateAllLabsService.execute()

    return res.json({ message })
  }
}
