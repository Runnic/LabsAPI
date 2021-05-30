export default interface IExam {
  _id?: string
  name: string
  type: 'Análise Clínica' | 'Imagem'
  status: 'Ativo' | 'Inativo'
}
