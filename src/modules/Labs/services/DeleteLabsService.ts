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
      await Promise.all(
        data.map(async (queryLab) => {
          if (queryLab._id.length === 24) {
            const nModified = await this.labsRepository.deleteOne(queryLab._id)

            if (nModified > 0) count += 1
          }
        })
      )

      return `${count} laboratórios removidos.`
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
