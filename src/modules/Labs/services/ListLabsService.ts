import { inject, injectable } from 'tsyringe'

import ILabsRepository from '../repositories/ILabRepository'

@injectable()
class ListLabsService {
  constructor(
    @inject('LabsRepository') private labsRepository: ILabsRepository
  ) {}

  async execute() {
    const labs = await this.labsRepository.list()

    return labs.filter((lab) => lab.status === 'Ativo')
  }
}

export default ListLabsService
