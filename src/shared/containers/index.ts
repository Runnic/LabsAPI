import { container } from 'tsyringe'

import ILabsRepository from '@modules/Labs/repositories/ILabRepository'
import LabsRepository from '@modules/Labs/infra/mongoose/repositories/LabRepository'

import IExamsRepository from '@modules/Exams/repositories/IExamsRepository'
import ExamsRepository from '@modules/Exams/infra/mongoose/repositories/ExamsRepository'

import IAssociationsRepository from '@modules/Exams/repositories/IAssociationsRepository'
import AssociationRepository from '@modules/Exams/infra/mongoose/repositories/AssociationsRepository'

container.registerSingleton<ILabsRepository>('LabsRepository', LabsRepository)

container.registerSingleton<IExamsRepository>(
  'ExamsRepository',
  ExamsRepository
)

container.registerSingleton<IAssociationsRepository>(
  'AssociationsRepository',
  AssociationRepository
)
