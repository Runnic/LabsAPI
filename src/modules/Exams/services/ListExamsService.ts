import { inject, injectable } from 'tsyringe'

import IExamsRepository from '../repositories/IExamsRepository'

@injectable()
class ListExamsService {
  constructor(
    @inject('ExamsRepository') private examsRepository: IExamsRepository
  ) {}

  async execute() {
    const labsArray = await this.examsRepository.list()

    return labsArray
  }
}

export default ListExamsService
