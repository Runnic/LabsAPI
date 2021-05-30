import { inject, injectable } from 'tsyringe'

import IAssociationRepository from '../repositories/IAssociationsRepository'

import AppError from '@shared/Errors/AppError'

import ICreateAssociationsDTO from '../DTOS/ICreateAssociationsDTO'
@injectable()
class CreateAssociationService {
  constructor(
    @inject('AssociationsRepository')
    private associationsRepository: IAssociationRepository
  ) {}

  async execute(data: ICreateAssociationsDTO | ICreateAssociationsDTO[]) {
    if (data instanceof Array) {
      const newAssociations = await Promise.all(
        data.map(async (queryAssociation) => {
          const associations = await this.associationsRepository.listByExamId(
            queryAssociation.examId
          )

          const alreadyExists = associations.filter((association) => {
            if (association.labId === queryAssociation.labId) return
          })

          if (!alreadyExists)
            return {
              message: `Associação entre ExamID:${queryAssociation.examId} e LabID:${queryAssociation.labId} já existe.`,
            }

          const newAssociation = await this.associationsRepository.create(
            queryAssociation
          )

          return newAssociation
        })
      )

      return newAssociations
    }

    const associations = await this.associationsRepository.listByExamId(
      data.examId
    )

    associations.forEach((association) => {
      if (association.labId === data.labId)
        throw new AppError('Associação já existe.', 409)
    })

    const newAssociation = await this.associationsRepository.create(data)

    return newAssociation
  }
}

export default CreateAssociationService
