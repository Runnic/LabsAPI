export default interface ICreateAssociationsFromExamDTO {
  examId: string
  labsIds: {
    _id: string
  }[]
}
