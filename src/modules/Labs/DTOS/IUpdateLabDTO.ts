export default interface IUpdateLabDTO {
  _id: string
  name?: string
  address?: string
  status?: 'Ativo' | 'Inativo'
}
