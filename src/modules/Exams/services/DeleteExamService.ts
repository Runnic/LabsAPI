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
      const errors = await Promise.all(
        data.map(async (queryExam) => {
          if (queryExam._id.length !== 24)
            return `ID: ${queryExam._id} inválido.`

          const nModified = await this.examsRepository.delete(queryExam._id)

          if (nModified <= 0) return `ID: ${queryExam._id} não encontrado.`

          count += 1

          return null
        })
      )

      return {
        message: `${count} exames removidos.`,
        erros: errors.filter((error) => error !== null),
      }
    }

    if (data._id.length !== 24) throw new AppError('ID inválido.')

    const nModified = await this.examsRepository.delete(data._id)

    if (nModified <= 0) throw new AppError('Exame não encontrado.', 404)

    return 'Exame removido.'
  }
}

export default DeleteExamService
