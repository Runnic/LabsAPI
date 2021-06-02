import ILab from '@modules/Labs/interfaces/ILab'

import Lab from '../entities/Lab'

import ILabsRepository from '@modules/Labs/repositories/ILabRepository'

import ICreateLabDTO from '@modules/Labs/DTOS/ICreateLabDTO'
import IDeleteLabDTO from '@modules/Labs/DTOS/IDeleteLabDTO'
import IUpdateLabDTO from '@modules/Labs/DTOS/IUpdateLabDTO'

export default class LabRepository implements ILabsRepository {
  private mongooseRepository: typeof Lab

  constructor() {
    this.mongooseRepository = Lab
  }

  async list(): Promise<ILab[]> {
    const labs = await this.mongooseRepository.find()

    return labs
  }

  async listById(_id: string): Promise<null | ILab> {
    const lab = await this.mongooseRepository.findById(_id)

    return lab
  }

  async listByName(name: string): Promise<null | ILab> {
    const lab = await this.mongooseRepository.findOne({ name })

    return lab
  }

  async create({ name, address }: ICreateLabDTO): Promise<ILab> {
    const lab = await this.mongooseRepository.create({
      name,
      address,
      status: 'Ativo',
    })

    return lab
  }

  async delete(_id: string): Promise<Number> {
    const { nModified } = await this.mongooseRepository.updateOne(
      { _id, status: 'Ativo' },
      { status: 'Inativo' }
    )

    return nModified
  }

  async update(data: IUpdateLabDTO): Promise<Number> {
    const { n } = await this.mongooseRepository.updateOne(
      { _id: data._id },
      { ...data }
    )

    return n
  }

  async activateAll(): Promise<Number> {
    const { nModified } = await this.mongooseRepository.updateMany(
      { status: 'Inativo' },
      { status: 'Ativo' }
    )

    return nModified
  }

  async deleteAll(): Promise<Number> {
    const { nModified } = await this.mongooseRepository.updateMany(
      { status: 'Ativo' },
      { status: 'Inativo' }
    )

    return nModified
  }
}
