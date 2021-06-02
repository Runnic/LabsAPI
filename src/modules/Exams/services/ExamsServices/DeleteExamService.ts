import { inject, injectable } from 'tsyringe'

import AppError from '@shared/Errors/AppError'

import IExamsRepository from '../../repositories/IExamsRepository'

interface IRequest {
  _id: string
}
@injectable()
class DeleteExamService {
  constructor(
    @inject('ExamsRepository') private examsRepository: IExamsRepository
  ) {}

  async execute(data: IRequest | IRequest[]) {
    if (data instanceof Array) {
      const errors: string[] = []
      let count = 0

      await Promise.all(
        data.map(async (queryExam) => {
          const nModified = await this.examsRepository.delete(queryExam._id)

          if (nModified <= 0) {
            errors.push(`ID: ${queryExam._id} não encontrado.`)
            return
          }

          count += 1

          return
        })
      )

      return {
        message: `${count} exames removidos.`,
        erros: errors,
      }
    }

    const nModified = await this.examsRepository.delete(data._id)

    if (nModified <= 0) throw new AppError('Exame não encontrado.', 404)

    return 'Exame removido.'
  }
}

export default DeleteExamService
