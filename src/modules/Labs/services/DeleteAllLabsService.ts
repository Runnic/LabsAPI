import { inject, injectable } from 'tsyringe'

import AppError from '@shared/Errors/AppError'

import ILabsRepository from '../repositories/ILabRepository'

@injectable()
class DeleteAllLabsService {
  constructor(
    @inject('LabsRepository') private labsRepository: ILabsRepository
  ) {}

  async execute() {
    const nModified = await this.labsRepository.deleteAll()

    if (nModified <= 0) {
      throw new AppError('Nenhum laboratório encontrado.', 404)
    }
    return `${nModified} laboratórios removidos.`
  }
}

export default DeleteAllLabsService
