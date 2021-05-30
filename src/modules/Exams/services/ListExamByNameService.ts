import { inject, injectable } from 'tsyringe'

import AppError from '@shared/Errors/AppError'

import IExamsRepository from '../repositories/IExamsRepository'

@injectable()
class ListExamByNameService {
  constructor(
    @inject('ExamsRepository') private examsRepository: IExamsRepository
  ) {}

  async execute(name: string) {
    const exam = await this.examsRepository.listByName(name)

    if (!exam) throw new AppError('Exame não encontrado.', 404)

    return exam
  }
}

export default ListExamByNameService
