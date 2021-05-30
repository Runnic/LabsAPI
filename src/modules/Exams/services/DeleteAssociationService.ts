import { inject, injectable } from 'tsyringe'

import AppError from '@shared/Errors/AppError'

import IAssociationRepository from '../repositories/IAssociationsRepository'

interface IRequest {
  _id: string
}
@injectable()
class CreateAssociationService {
  constructor(
    @inject('AssociationsRepository')
    private associationsRepository: IAssociationRepository
  ) {}

  async execute(data: IRequest | IRequest[]) {
    if (data instanceof Array) {
      let count = 0
      await Promise.all(
        data.map(async (queryAssociation) => {
          if (queryAssociation._id.length === 24) {
            const ok = await this.associationsRepository.delete(
              queryAssociation._id
            )

            if (ok) count += 1
          }
        })
      )

      return `${count} associações removidas.`
    }

    if (data._id.length !== 24) throw new AppError('ID inválido')

    const ok = await this.associationsRepository.delete(data._id)

    if (ok !== 1) throw new AppError('Erro ao excluir associação.')

    return 'Associação removida.'
  }
}

export default CreateAssociationService
