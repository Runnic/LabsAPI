import { inject, injectable } from 'tsyringe'

import IAssociationsRepository from '../repositories/IAssociationsRepository'

@injectable()
class ListAssociationsService {
  constructor(
    @inject('AssociationsRepository')
    private associationsRepository: IAssociationsRepository
  ) {}

  async execute() {
    const labsArray = await this.associationsRepository.list()

    return labsArray
  }
}

export default ListAssociationsService
