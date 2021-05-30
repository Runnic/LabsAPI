import { Request, Response } from 'express'
import { container } from 'tsyringe'

import CreateLabService from '@modules/Labs/services/CreateLabService'
import ListLabsService from '@modules/Labs/services/ListLabsService'
import DeleteLabsService from '@modules/Labs/services/DeleteLabsService'
import UpdateLabsService from '@modules/Labs/services/UpdateLabsService'
import ListLabByIDService from '@modules/Labs/services/ListLabByIDService'
import ListLabByNameService from '@modules/Labs/services/ListLabByNameService'
export default class LabController {
  async list(req: Request, res: Response): Promise<Response> {
    const listLabsService = container.resolve(ListLabsService)

    const labs = await listLabsService.execute()

    return res.json({ labs })
  }

  async listByID(req: Request, res: Response): Promise<Response> {
    const listLabByIDService = container.resolve(ListLabByIDService)
    const { _id } = req.params

    const lab = await listLabByIDService.execute(_id)

    return res.json({ lab })
  }

  async create(req: Request, res: Response): Promise<Response> {
    const createLabService = container.resolve(CreateLabService)

    const labs = await createLabService.execute(req.body)

    return res.json({ labs })
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const deleteLabsService = container.resolve(DeleteLabsService)

    const message = await deleteLabsService.execute(req.body)

    return res.json({ message })
  }

  async update(req: Request, res: Response): Promise<Response> {
    const updateLabsService = container.resolve(UpdateLabsService)

    const labs = await updateLabsService.execute(req.body)

    return res.json({ labs })
  }
}
