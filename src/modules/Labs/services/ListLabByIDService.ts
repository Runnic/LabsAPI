import { inject, injectable } from 'tsyringe'

import AppError from '@shared/Errors/AppError'

import ILabsRepository from '../repositories/ILabRepository'

@injectable()
class ListLabByIDService {
  constructor(
    @inject('LabsRepository') private labsRepository: ILabsRepository
  ) {}

  async execute(_id: string) {
    if (_id.length !== 24) throw new AppError('ID inválido.')

    const lab = await this.labsRepository.listById(_id)

    return lab
  }
}

export default ListLabByIDService
