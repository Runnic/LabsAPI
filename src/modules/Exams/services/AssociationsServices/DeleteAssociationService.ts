import { inject, injectable } from 'tsyringe'

import AppError from '@shared/Errors/AppError'

import IAssociationRepository from '../../repositories/IAssociationsRepository'

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
      const errors: string[] = []
      let count = 0

      await Promise.all(
        data.map(async (queryAssociation) => {
          if (queryAssociation._id.length === 24) {
            const association = await this.associationsRepository.listOne(
              queryAssociation._id
            )

            if (!association) {
              errors.push(`Associação ID: ${queryAssociation._id} inexistente.`)
              return
            }

            const ok = await this.associationsRepository.delete(
              queryAssociation._id
            )

            if (ok !== 1) {
              errors.push(
                `Associação ID: ${queryAssociation._id}, erro interno ao excluir associação.`
              )
              return
            }

            count += 1

            return
          }
        })
      )

      return { message: `${count} associações removidas.`, errors }
    }

    const association = await this.associationsRepository.listOne(data._id)

    if (!association) throw new AppError('Associação inexistente.')

    const ok = await this.associationsRepository.delete(data._id)

    if (ok !== 1) throw new AppError('Erro interno ao excluir associação.')

    return 'Associação removida.'
  }
}

export default CreateAssociationService
