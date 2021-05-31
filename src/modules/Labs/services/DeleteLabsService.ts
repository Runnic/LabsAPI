import { inject, injectable } from 'tsyringe'

import AppError from '@shared/Errors/AppError'

import ILabsRepository from '../repositories/ILabRepository'

interface IRequest {
  _id: string
}
@injectable()
class DeleteLabsService {
  constructor(
    @inject('LabsRepository') private labsRepository: ILabsRepository
  ) {}

  async execute(data: IRequest | IRequest[]) {
    if (data instanceof Array) {
      let count = 0
      const errors = await Promise.all(
        data.map(async (queryLab) => {
          if (queryLab._id.length !== 24) return `ID: ${queryLab._id} inválido.`

          const nModified = await this.labsRepository.deleteOne(queryLab._id)

          if (nModified <= 0) return `ID: ${queryLab._id} não encontrado.`

          count += 1
          return null
        })
      )

      return {
        message: `${count} laboratórios removidos.`,
        erros: errors.filter((error) => error !== null),
      }
    }

    if (data._id.length !== 24) throw new AppError('ID inválido.')

    const nModified = await this.labsRepository.deleteOne(data._id)

    if (nModified <= 0) {
      throw new AppError('Nenhum laboratório encontrado.', 404)
    }
    return `Laboratório removido.`
  }
}

export default DeleteLabsService
