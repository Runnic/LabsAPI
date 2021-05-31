import ILab from '../interfaces/ILab'

import ICreateLabDTO from '../DTOS/ICreateLabDTO'
import IDeleteLabDTO from '../DTOS/IDeleteLabDTO'
import IUpdateLabDTO from '../DTOS/IUpdateLabDTO'
export default interface ILabsRepository {
  list(): Promise<ILab[]>

  listById(_id: string): Promise<null | ILab>

  listByName(name: string): Promise<null | ILab>

  create(data: ICreateLabDTO): Promise<ILab>

  deleteOne(_id: string): Promise<Number>

  updateOne(data: IUpdateLabDTO): Promise<Number>

  deleteAll(): Promise<Number>

  activateAll(): Promise<Number>
}
