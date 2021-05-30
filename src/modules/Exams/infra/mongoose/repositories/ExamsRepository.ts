import IExam from '@modules/Exams/interfaces/IExam'

import Exam from '../entities/Exams'

import IExamsRepository from '@modules/Exams/repositories/IExamsRepository'

import ICreateExamDTO from '@modules/Exams/DTOS/ICreateExamDTO'
import IUpdateExamDTO from '@modules/Exams/DTOS/IUpdateExamDTO'

export default class ExamRepository implements IExamsRepository {
  private mongooseRepository: typeof Exam

  constructor() {
    this.mongooseRepository = Exam
  }

  async list(): Promise<IExam[]> {
    const examsList = await this.mongooseRepository.find({ status: 'Ativo' })

    return examsList
  }

  async listById(_id: string): Promise<null | IExam> {
    const exam = await this.mongooseRepository.findById(_id)

    return exam
  }

  async listByName(name: string): Promise<null | IExam> {
    const exam = await this.mongooseRepository.findOne({
      name,
      status: 'Ativo',
    })

    return exam
  }

  async create({ name, type }: ICreateExamDTO): Promise<IExam> {
    const newExam = await this.mongooseRepository.create({
      name,
      type,
      status: 'Ativo',
    })

    return newExam
  }

  async delete(_id: string): Promise<Number> {
    const { nModified } = await this.mongooseRepository.updateOne(
      { _id },
      { status: 'Inativo' }
    )

    return nModified
  }

  async update(data: IUpdateExamDTO): Promise<Number> {
    const { n } = await this.mongooseRepository.updateOne(
      { _id: data._id },
      { ...data }
    )

    return n
  }
}
