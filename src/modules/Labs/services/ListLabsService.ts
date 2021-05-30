import { inject, injectable } from 'tsyringe'

import ILabsRepository from '../repositories/ILabRepository'

@injectable()
class ListLabsService {
  constructor(
    @inject('LabsRepository') private labsRepository: ILabsRepository
  ) {}

  async execute() {
    const labsArray = await this.labsRepository.list()

    return labsArray
  }
}

export default ListLabsService
