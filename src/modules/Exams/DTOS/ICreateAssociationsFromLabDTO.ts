export default interface ICreateAssociationsFromLabDTO {
  labId: string
  examsIds: {
    _id: string
  }[]
}
