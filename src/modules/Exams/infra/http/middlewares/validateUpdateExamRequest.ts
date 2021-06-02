import { Request, Response, NextFunction } from 'express'
import Ajv, { JSONSchemaType } from 'ajv'

import AppError from '@shared/Errors/AppError'

import globalMessages from '@shared/global/globalMessages'

interface IDataRequest {
  _id: string
  name: string
  type: 'Análise Clínica' | 'Imagem'
  status: 'Ativo' | 'Inativo'
}

export default async function validateUpdateExamRequest(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const ajv = new Ajv()
  const data = req.body

  const schema: JSONSchemaType<IDataRequest> = {
    type: 'object',
    properties: {
      _id: { type: 'string', maxLength: 24, minLength: 24 },
      name: { type: 'string' },
      type: { type: 'string' },
      status: { type: 'string' },
    },
    required: ['_id'],
    additionalProperties: false,
  }

  const validate = ajv.compile(schema)

  if (data instanceof Array) {
    const errorItems = data.filter((item) => {
      if (!validate(item)) return true

      if (item.status) {
        if (item.status !== 'Ativo' && item.status !== 'Inativo') return true
      }

      if (item.type) {
        if (item.type !== 'Análise Clínica' && item.type !== 'Imagem')
          return true
      }
    })

    if (errorItems.length > 0)
      throw new AppError(globalMessages.invalidParameters, 400, errorItems)

    return next()
  }

  if (!validate(data)) {
    throw new AppError(globalMessages.invalidParameters)
  }

  if (data.status) {
    if (data.status !== 'Ativo' && data.status !== 'Inativo')
      throw new AppError(globalMessages.invalidParameters)
  }

  if (data.type) {
    if (data.type !== 'Análise Clínica' && data.type !== 'Imagem')
      throw new AppError(globalMessages.invalidParameters)
  }

  return next()
}
