import IAssociation from '@modules/Exams/interfaces/IAssociation'

import Associations from '../entities/Associations'

import IAssociationsRepository from '@modules/Exams/repositories/IAssociationsRepository'
import ICreateAssociationsDTO from '@modules/Exams/DTOS/ICreateAssociationsDTO'

export default class AssociationRepository implements IAssociationsRepository {
  private mongooseRepository: typeof Associations

  constructor() {
    this.mongooseRepository = Associations
  }

  async list(): Promise<IAssociation[]> {
    const associationArray = await this.mongooseRepository.find()

    return associationArray
  }

  async listOne(_id: string): Promise<null | IAssociation> {
    const association = await this.mongooseRepository.findOne({ _id })

    return association
  }

  async listByExamId(examId: string): Promise<IAssociation[]> {
    const associationsList = await this.mongooseRepository.find({ examId })

    return associationsList
  }

  async listByLabId(labId: string): Promise<IAssociation[]> {
    const associationsList = await this.mongooseRepository.find({ labId })

    return associationsList
  }

  async create({
    examId,
    labId,
  }: ICreateAssociationsDTO): Promise<IAssociation> {
    const newAssociation = await this.mongooseRepository.create({
      examId,
      labId,
    })

    return newAssociation
  }

  async delete(_id: string): Promise<undefined | Number> {
    const { ok } = await this.mongooseRepository.deleteOne({ _id })

    return ok
  }
}
