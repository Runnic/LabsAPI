import AppError from '@shared/Errors/AppError'
import { inject, injectable } from 'tsyringe'

import ILabsRepository from '../repositories/ILabRepository'

interface IRequest {
  name: string
  address: string
}

@injectable()
class CreateLabService {
  constructor(
    @inject('LabsRepository') private labsRepository: ILabsRepository
  ) {}

  async execute(data: IRequest | IRequest[]) {
    if (data instanceof Array) {
      const newLabs = await Promise.all(
        data.map(async (reqLab) => {
          const { name, address } = reqLab

          const lab = await this.labsRepository.listByName(name)

          if (lab) return { message: `${lab.name} ja existe.` }

          const newLab = await this.labsRepository.create({ name, address })

          return newLab
        })
      )

      return newLabs
    }

    const { name, address } = data

    const lab = await this.labsRepository.listByName(name)

    if (lab) throw new AppError('Laboratório ja existe.', 409)

    const newLab = await this.labsRepository.create({ name, address })

    return newLab
  }
}

export default CreateLabService
