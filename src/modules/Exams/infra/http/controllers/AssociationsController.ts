import { Request, Response } from 'express'
import { container } from 'tsyringe'

import CreateAssociationService from '@modules/Exams/services/AssociationsServices/CreateAssociationService'
import DeleteAssociationService from '@modules/Exams/services/AssociationsServices/DeleteAssociationService'
import ListAssociationsService from '@modules/Exams/services/AssociationsServices/ListAssociationsService'
import CreateAssociationsFromExamService from '@modules/Exams/services/AssociationsServices/CreateAssociationsFromExamService'
import CreateAssociationFromLabService from '@modules/Exams/services/AssociationsServices/CreateAssociationsFromLabService'

export default class AssociationsController {
  async list(req: Request, res: Response) {
    const listAssociationsService = container.resolve(ListAssociationsService)

    const associations = await listAssociationsService.execute()

    return res.json({ associations })
  }

  // async listOne(req: Request, res: Response) {
  //   const listOneAssociationService = container.resolve(
  //     ListOneAssociationService
  //   )
  //   const { _id } = req.params

  //   const association = await listOneAssociationService.execute(_id)

  //   return res.json({ association })
  // }

  async createFromExam(req: Request, res: Response) {
    const createAssociationFromExamService = container.resolve(
      CreateAssociationsFromExamService
    )
    const { _id } = req.params

    const newAssociations = await createAssociationFromExamService.execute({
      examId: _id,
      labsIds: req.body,
    })

    return res.json({ newAssociations })
  }

  async createFromLab(req: Request, res: Response) {
    const createAssociationFromLabService = container.resolve(
      CreateAssociationFromLabService
    )
    const { _id } = req.params

    const newAssociations = await createAssociationFromLabService.execute({
      labId: _id,
      examsIds: req.body,
    })

    return res.json({ newAssociations })
  }

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
