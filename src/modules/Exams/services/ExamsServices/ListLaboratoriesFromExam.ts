import { inject, injectable } from 'tsyringe'

import AppError from '@shared/Errors/AppError'

import IExamsRepository from '../../repositories/IExamsRepository'
import IAssociationRepository from '../../repositories/IAssociationsRepository'
import ILabsRepository from '@modules/Labs/repositories/ILabRepository'

@injectable()
class ListExamByNameService {
  constructor(
    @inject('ExamsRepository') private examsRepository: IExamsRepository,
    @inject('AssociationsRepository')
    private associationsRepository: IAssociationRepository,
    @inject('LabsRepository') private labsRepository: ILabsRepository
  ) {}

  async execute(name: string) {
    const exam = await this.examsRepository.listByName(name)

    if (!exam?._id || exam.status === 'Inativo')
      throw new AppError('Exame não encontrado.', 404)

    const associations = await this.associationsRepository.listByExamId(
      exam._id
    )

    if (associations.length <= 0)
      throw new AppError('Nenhuma relação encontrada com esse exame.', 404)

    const labs = await Promise.all(
      associations.map(async (association) => {
        const lab = await this.labsRepository.listById(association.labId)
        return lab
      })
    )

    return labs
  }
}

export default ListExamByNameService
