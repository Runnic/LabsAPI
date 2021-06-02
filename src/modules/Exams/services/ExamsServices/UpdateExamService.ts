import { inject, injectable } from 'tsyringe'

import AppError from '@shared/Errors/AppError'

import IExamsRepository from '../../repositories/IExamsRepository'
import IUpdateExamDTO from '../../DTOS/IUpdateExamDTO'

@injectable()
class UpdateExamService {
  constructor(
    @inject('ExamsRepository') private examsRepository: IExamsRepository
  ) {}

  async execute(data: IUpdateExamDTO | IUpdateExamDTO[]) {
    if (data instanceof Array) {
      let count = 0
      const errors: string[] = []

      await Promise.all(
        data.map(async (queryExam) => {
          const matchedLabs = await this.examsRepository.update(queryExam)

          if (matchedLabs <= 0) {
            errors.push(`ID: ${queryExam._id} não encontrado.`)
            return
          }

          count += 1
        })
      )

      return {
        message: `${count} exames alterados.`,
        erros: errors,
      }
    }

    const n = await this.examsRepository.update(data)

    if (n <= 0) throw new AppError('Exame não encontrado.', 404)

    const exam = await this.examsRepository.listById(data._id)

    return exam
  }
}

export default UpdateExamService
