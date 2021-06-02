import ILab from '../interfaces/ILab'
import IExam from '@modules/Exams/interfaces/IExam'

import ICreateLabDTO from '../DTOS/ICreateLabDTO'
import IDeleteLabDTO from '../DTOS/IDeleteLabDTO'
import IUpdateLabDTO from '../DTOS/IUpdateLabDTO'
export default interface ILabsRepository {
  list(): Promise<ILab[]>

  listById(_id: string): Promise<null | ILab>

  listByName(name: string): Promise<null | ILab>

  create(data: ICreateLabDTO): Promise<ILab>

  delete(_id: string): Promise<Number>

  update(data: IUpdateLabDTO): Promise<Number>

  deleteAll(): Promise<Number>

  activateAll(): Promise<Number>
}
