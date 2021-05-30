import IExam from '../interfaces/IExam'

import ICreateExamDTO from '../DTOS/ICreateExamDTO'
import IUpdateExamDTO from '../DTOS/IUpdateExamDTO'

export default interface IExamsRepository {
  list(): Promise<IExam[]>

  listById(_id: string): Promise<null | IExam>

  listByName(name: string): Promise<null | IExam>

  create(data: ICreateExamDTO): Promise<IExam>

  delete(_id: string): Promise<Number>

  update(data: IUpdateExamDTO): Promise<Number>
}
