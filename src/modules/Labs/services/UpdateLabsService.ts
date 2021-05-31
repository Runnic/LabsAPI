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
          if (queryLab._id.length !== 24)
            return { message: `LabID: ${queryLab._id} é inválido.` }

          if (queryLab.status) {
            if (!(queryLab.status === 'Ativo' || queryLab.status === 'Inativo'))
              return {
                message: `LabID: ${queryLab._id}, alteração de status inválido.`,
              }
          }

          const matchedLabs = await this.labsRepository.updateOne(queryLab)

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

    if (data._id.length !== 24) throw new AppError('ID inválido.')

    if (data.status) {
      if (!(data.status === 'Ativo' || data.status === 'Inativo'))
        throw new AppError('Status inválido.')
    }

    const matchedLabs = await this.labsRepository.updateOne(data)

    if (matchedLabs <= 0) throw new AppError('Laboratório não encontrado.', 404)

    const lab = await this.labsRepository.listById(data._id)

    return lab
  }
}

export default UpdateLabsService
