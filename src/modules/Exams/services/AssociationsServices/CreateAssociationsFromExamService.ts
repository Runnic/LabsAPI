import { inject, injectable } from 'tsyringe'

import IAssociationRepository from '../../repositories/IAssociationsRepository'
import IExamsRepository from '../../repositories/IExamsRepository'
import ILabsRepository from '@modules/Labs/repositories/ILabRepository'

import ILab from '@modules/Labs/interfaces/ILab'

import AppError from '@shared/Errors/AppError'

import ICreateAssociationsFromExamDTO from '../../DTOS/ICreateAssociationsFromExamDTO'

@injectable()
class CreateAssociationsFromExamService {
  constructor(
    @inject('AssociationsRepository')
    private associationsRepository: IAssociationRepository,
    @inject('ExamsRepository')
    private examsRepository: IExamsRepository,
    @inject('LabsRepository')
    private labsRepository: ILabsRepository
  ) {}

  async execute(data: ICreateAssociationsFromExamDTO) {
    const { examId, labsIds } = data

    const exam = await this.examsRepository.listById(examId)

    if (!exam || exam.status === 'Inativo')
      throw new AppError(`Exame não encontrado.`, 404)

    const labs: ILab[] = []
    const errors: string[] = []

    await Promise.all(
      labsIds.map(async (labId) => {
        const lab = await this.labsRepository.listById(labId._id)

        if (!lab || lab.status === 'Inativo') {
          errors.push(`Laboratório ID:${labId._id} não encontrado.`)
          return
        }

        labs.push(lab)

        return
      })
    )

    const associations = await this.associationsRepository.listByExamId(examId)
    const excludeLabs: ILab[] = []

    if (associations.length > 0) {
      for (let lab of labs) {
        for (let association of associations) {
          if (association.labId === String(lab._id)) {
            errors.push(`Laboratório ID:${lab._id}, relação já criada.`)
            excludeLabs.push(lab)
            break
          }
        }
      }
    }

    const filtredLabs: ILab[] = labs.filter((lab) => !excludeLabs.includes(lab))

    const newAssociations = await Promise.all(
      filtredLabs.map(async (lab) => {
        const newAssociation = await this.associationsRepository.create({
          labId: lab._id as string,
          examId,
        })

        return newAssociation
      })
    )

    return { newAssociations, errors }
  }
}

export default CreateAssociationsFromExamService
