import { inject, injectable } from 'tsyringe'

import AppError from '@shared/Errors/AppError'

import IExamsRepository from '../repositories/IExamsRepository'

@injectable()
class DeleteAllExamsService {
  constructor(
    @inject('ExamsRepository') private examsRepository: IExamsRepository
  ) {}

  async execute() {
    const nModified = await this.examsRepository.deleteAll()

    if (nModified <= 0) {
      throw new AppError('Nenhum exame encontrado.', 404)
    }
    return `${nModified} exame removidos.`
  }
}

export default DeleteAllExamsService
