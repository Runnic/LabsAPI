import { Request, Response } from 'express'
import { container } from 'tsyringe'

import CreateAssociationService from '@modules/Exams/services/CreateAssociationService'
import DeleteAssociationService from '@modules/Exams/services/DeleteAssociationService'
// import ListAssociationsService from '@modules/Exams/services/ListAssociationsService'
// import ListOneAssociationService from '@modules/Exams/services/ListOneAssociationService'

export default class AssociationsController {
  // async list(req: Request, res: Response) {
  //   const listAssociationsService = container.resolve(ListAssociationsService)

  //   const associations = await listAssociationsService.execute()

  //   return res.json({ associations })
  // }

  // async listOne(req: Request, res: Response) {
  //   const listOneAssociationService = container.resolve(
  //     ListOneAssociationService
  //   )
  //   const { _id } = req.params

  //   const association = await listOneAssociationService.execute(_id)

  //   return res.json({ association })
  // }

  async create(req: Request, res: Response) {
    const createAssociationService = container.resolve(CreateAssociationService)

    const newAssociation = await createAssociationService.execute(req.body)

    return res.json({ newAssociation })
  }

  async delete(req: Request, res: Response) {
    const deleteAssociationService = container.resolve(DeleteAssociationService)

    const message = await deleteAssociationService.execute(req.body)

    return res.json({ message })
  }
}
