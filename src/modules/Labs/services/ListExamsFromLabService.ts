import { inject, injectable } from 'tsyringe'

import ILabsRepository from '../repositories/ILabRepository'

import AssociationRepository from '@modules/Exams/infra/mongoose/repositories/AssociationsRepository'
import ExamRepository from '@modules/Exams/infra/mongoose/repositories/ExamsRepository'

import AppError from '@shared/Errors/AppError'

@injectable()
class ListExamFromLabService {
  constructor(
    @inject('LabsRepository') private labsRepository: ILabsRepository,
    @inject('AssociationsRepository')
    private associationsRepository: AssociationRepository,
    @inject('ExamsRepository') private examsRepository: ExamRepository
  ) {}

  async execute(name: string) {
    const lab = await this.labsRepository.listByName(name)

    if (!lab?._id || lab.status === 'Inativo')
      throw new AppError('Laboratório não encontrado.', 404)

    const associations = await this.associationsRepository.listByLabId(lab._id)

    if (associations.length <= 0)
      throw new AppError(
        'Nenhuma relação encontrada com esse laboratório.',
        404
      )

    const exams = await Promise.all(
      associations.map(async (association) => {
        const exam = await this.examsRepository.listById(association.examId)

        return exam
      })
    )

    return exams
  }
}

export default ListExamFromLabService
