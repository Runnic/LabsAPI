import { inject, injectable } from 'tsyringe'

import AppError from '@shared/Errors/AppError'

import ILabsRepository from '../repositories/ILabRepository'

@injectable()
class ListLabByNameService {
  constructor(
    @inject('LabsRepository') private labsRepository: ILabsRepository
  ) {}

  async execute(name: string | undefined) {
    if (!name) throw new AppError('Nome do laboratório não informado.')

    const lab = await this.labsRepository.listByName(name)

    return lab
  }
}

export default ListLabByNameService
