import { inject, injectable } from 'tsyringe'

import AppError from '@shared/Errors/AppError'

import IExamsRepository from '../repositories/IExamsRepository'

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
      let count = 0
      await Promise.all(
        data.map(async (queryExam) => {
          if (queryExam._id.length === 24) {
            const nModified = await this.examsRepository.delete(queryExam._id)

            if (nModified > 0) count += 1
          }
        })
      )

      return `${count} exames removidos.`
    }

    if (data._id.length !== 24) throw new AppError('ID inválido.')

    const nModified = await this.examsRepository.delete(data._id)

    if (nModified <= 0) throw new AppError('Exame não encontrado.', 404)

    return 'Exame removido.'
  }
}

export default DeleteExamService
