export default interface IUpdateExamDTO {
  _id: string
  name?: string
  type?: 'Análise Clínica' | 'Imagem'
  status?: 'Ativo' | 'Inativo'
}
