import { inject, injectable } from 'tsyringe'

import AppError from '@shared/Errors/AppError'

import ILabsRepository from '../repositories/ILabRepository'

@injectable()
class ActivateAllLabsService {
  constructor(
    @inject('LabsRepository') private labsRepository: ILabsRepository
  ) {}

  async execute() {
    const nModified = await this.labsRepository.activateAll()

    if (nModified <= 0) {
      throw new AppError('Nenhum laboratório desativado.', 404)
    }
    return `${nModified} laboratórios ativados.`
  }
}

export default ActivateAllLabsService
