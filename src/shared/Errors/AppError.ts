export default class AppError {
  public readonly message: string

  public readonly statusCode: number

  public readonly items?: any[]

  constructor(message: string, statusCode = 400, items?: any[]) {
    this.message = message
    this.statusCode = statusCode
    this.items = items
  }
}
