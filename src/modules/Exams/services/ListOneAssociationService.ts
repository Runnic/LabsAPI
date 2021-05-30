import { inject, injectable } from 'tsyringe'

import AppError from '@shared/Errors/AppError'

import IAssociationsRepository from '../repositories/IAssociationsRepository'

@injectable()
class ListOneAssociationService {
  constructor(
    @inject('AssociationsRepository')
    private associationsRepository: IAssociationsRepository
  ) {}

  async execute(_id: string) {
    if (_id.length !== 24) throw new AppError('ID inválido.')

    const association = await this.associationsRepository.listOne(_id)

    if (!association) throw new AppError('Associação não encontrada.', 404)

    return association
  }
}

export default ListOneAssociationService
