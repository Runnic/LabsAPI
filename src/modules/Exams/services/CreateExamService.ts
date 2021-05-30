import { inject, injectable } from 'tsyringe'

import IExamsRepository from '../repositories/IExamsRepository'

import ICreateExamDTO from '../DTOS/ICreateExamDTO'
import AppError from '@shared/Errors/AppError'

@injectable()
class CreateExamService {
  constructor(
    @inject('ExamsRepository') private examsRepository: IExamsRepository
  ) {}

  async execute(data: ICreateExamDTO | ICreateExamDTO[]) {
    if (data instanceof Array) {
      const newExams = await Promise.all(
        data.map(async (queryExam) => {
          const exam = await this.examsRepository.listByName(queryExam.name)

          if (exam) return { message: `Exame \'${queryExam.name}\' já existe.` }

          const newExam = await this.examsRepository.create(queryExam)

          return newExam
        })
      )

      return newExams
    }

    const exam = await this.examsRepository.listByName(data.name)

    if (exam) throw new AppError('Este exame já existe.', 409)

    const newExam = await this.examsRepository.create(data)

    return newExam
  }
}

export default CreateExamService
