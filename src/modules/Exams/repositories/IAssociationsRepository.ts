import IAssociation from '../interfaces/IAssociation'

import ICreateAssociationsDTO from '../DTOS/ICreateAssociationsDTO'

export default interface IAssociationRepository {
  list(): Promise<IAssociation[]>

  listOne(_id: string): Promise<null | IAssociation>

  listByExamId(exam_id: string): Promise<IAssociation[]>

  create(data: ICreateAssociationsDTO): Promise<IAssociation>

  delete(_id: string): Promise<undefined | Number>
}
