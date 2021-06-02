import { inject, injectable } from 'tsyringe'

import IAssociationRepository from '../../repositories/IAssociationsRepository'
import IExamsRepository from '../../repositories/IExamsRepository'
import ILabsRepository from '@modules/Labs/repositories/ILabRepository'

import IExam from '@modules/Exams/interfaces/IExam'

import AppError from '@shared/Errors/AppError'

import ICreateAssociationsFromLabDTO from '../../DTOS/ICreateAssociationsFromLabDTO'

@injectable()
class CreateAssociationsFromLabService {
  constructor(
    @inject('AssociationsRepository')
    private associationsRepository: IAssociationRepository,
    @inject('ExamsRepository')
    private examsRepository: IExamsRepository,
    @inject('LabsRepository')
    private labsRepository: ILabsRepository
  ) {}

  async execute(data: ICreateAssociationsFromLabDTO) {
    const { labId, examsIds } = data

    const lab = await this.labsRepository.listById(labId)

    if (!lab || lab.status === 'Inativo')
      throw new AppError(`Laboratório não encontrado.`, 404)

    const exams: IExam[] = []
    const errors: string[] = []

    await Promise.all(
      examsIds.map(async (examId) => {
        const exam = await this.examsRepository.listById(examId._id)

        if (!exam || exam.status === 'Inativo') {
          errors.push(`Exame ID:${examId._id} não encontrado.`)
          return
        }

        exams.push(exam)

        return
      })
    )

    const associations = await this.associationsRepository.listByLabId(labId)
    const excludeExams: IExam[] = []

    if (associations.length > 0) {
      for (let exam of exams) {
        for (let association of associations) {
          if (association.examId === String(exam._id)) {
            errors.push(`Exame ID:${exam._id}, relação já criada.`)
            excludeExams.push(exam)
            break
          }
        }
      }
    }

    const filtredExams: IExam[] = exams.filter(
      (exam) => !excludeExams.includes(exam)
    )

    const newAssociations = await Promise.all(
      filtredExams.map(async (exam) => {
        const newAssociation = await this.associationsRepository.create({
          examId: exam._id as string,
          labId,
        })

        return newAssociation
      })
    )

    return { newAssociations, errors }
  }
}

export default CreateAssociationsFromLabService
