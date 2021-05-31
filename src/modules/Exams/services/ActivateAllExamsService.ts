import { inject, injectable } from 'tsyringe'

import AppError from '@shared/Errors/AppError'

import IExamsRepository from '../repositories/IExamsRepository'

@injectable()
class ActivateAllExamsService {
  constructor(
    @inject('ExamsRepository') private examsRepository: IExamsRepository
  ) {}

  async execute() {
    const nModified = await this.examsRepository.activateAll()

    if (nModified <= 0) {
      throw new AppError('Nenhum exame removido.', 404)
    }
    return `${nModified} exame ativados.`
  }
}

export default ActivateAllExamsService
