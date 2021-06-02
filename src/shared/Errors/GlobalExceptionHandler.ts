import { Request, Response, NextFunction, response } from 'express'

import AppError from './AppError'

export default function GlobalExceptionHandler(
  error: Error,
  __: Request,
  res: Response,
  _: NextFunction
) {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      message: error.message,
      items: error.items,
    })
  }

  console.error(error)

  return response.status(500).json({
    message: 'Internal Server Error',
  })
}
