import { inject, injectable } from 'tsyringe'

import IExamsRepository from '../../repositories/IExamsRepository'

@injectable()
class ListExamsService {
  constructor(
    @inject('ExamsRepository') private examsRepository: IExamsRepository
  ) {}

  async execute() {
    const exams = await this.examsRepository.list()

    return exams.filter((exam) => exam.status === 'Ativo')
  }
}

export default ListExamsService
