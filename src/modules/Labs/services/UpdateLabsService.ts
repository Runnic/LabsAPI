import { inject, injectable } from 'tsyringe'

import AppError from '@shared/Errors/AppError'

import ILabsRepository from '../repositories/ILabRepository'
import IUpdateLabDTO from '../DTOS/IUpdateLabDTO'
@injectable()
class UpdateLabsService {
  constructor(
    @inject('LabsRepository') private labsRepository: ILabsRepository
  ) {}

  async execute(data: IUpdateLabDTO | IUpdateLabDTO[]) {
    if (data instanceof Array) {
      let count = 0

      const errors = await Promise.all(
        data.map(async (queryLab) => {
          const matchedLabs = await this.labsRepository.update(queryLab)

          if (matchedLabs <= 0)
            return { message: `LabID: ${queryLab._id} não encontrado.` }

          count += 1

          return null
        })
      )

      return {
        message: `${count} laboratórios alterados.`,
        erros: errors.filter((error) => error !== null),
      }
    }

    const matchedLabs = await this.labsRepository.update(data)

    if (matchedLabs <= 0) throw new AppError('Laboratório não encontrado.', 404)

    const lab = await this.labsRepository.listById(data._id)

    return lab
  }
}

export default UpdateLabsService
