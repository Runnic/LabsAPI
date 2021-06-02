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
      const errors: string[] = []

      await Promise.all(
        data.map(async (queryLab) => {
          const nModified = await this.labsRepository.delete(queryLab._id)

          if (nModified <= 0) {
            errors.push(`ID: ${queryLab._id} não encontrado.`)
            return
          }

          count += 1
        })
      )

      return {
        message: `${count} laboratórios removidos.`,
        erros: errors,
      }
    }

    const nModified = await this.labsRepository.delete(data._id)

    if (nModified <= 0) {
      throw new AppError('Laboratório não encontrado.', 404)
    }
    return `Laboratório removido.`
  }
}

export default DeleteLabsService
