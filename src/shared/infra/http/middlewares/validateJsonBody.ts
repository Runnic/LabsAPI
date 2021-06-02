import { Request, Response } from 'express'

export default function validateJsonBody(
  _: Request,
  res: Response,
  buf: Buffer
) {
  try {
    JSON.parse(buf as any)
  } catch {
    res.status(400).json({
      message: 'Formato de JSON inválido.',
    })

    throw Error('Inválid JSON.')
  }
}
