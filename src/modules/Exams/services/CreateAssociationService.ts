import { inject, injectable } from 'tsyringe'

import IAssociationRepository from '../repositories/IAssociationsRepository'
import IExamsRepository from '../repositories/IExamsRepository'
import ILabsRepository from '@modules/Labs/repositories/ILabRepository'

import AppError from '@shared/Errors/AppError'

import ICreateAssociationsDTO from '../DTOS/ICreateAssociationsDTO'

@injectable()
class CreateAssociationService {
  constructor(
    @inject('AssociationsRepository')
    private associationsRepository: IAssociationRepository,
    @inject('ExamsRepository')
    private examsRepository: IExamsRepository,
    @inject('LabsRepository')
    private labsRepository: ILabsRepository
  ) {}

  async execute(data: ICreateAssociationsDTO | ICreateAssociationsDTO[]) {
    if (data instanceof Array) {
      const newAssociations = await Promise.all(
        data.map(async (queryAssociation) => {
          const exam = await this.examsRepository.listById(
            queryAssociation.examId
          )

          if (exam && exam.status === 'Inativo')
            return `Exame ID: ${queryAssociation.examId} não encontrado.`

          const lab = await this.labsRepository.listById(queryAssociation.labId)

          if (lab && lab.status === 'Inativo')
            return `Laboratorio ID: ${queryAssociation.labId} não encontrado`

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

    const exam = await this.examsRepository.listById(data.examId)

    if (exam && exam.status === 'Inativo')
      throw new AppError(`Exame não encontrado.`, 404)

    const lab = await this.labsRepository.listById(data.labId)

    if (lab && lab.status === 'Inativo')
      throw new AppError(`Laboratorio não encontrado`, 404)

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
