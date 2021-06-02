import { Request, Response, NextFunction } from 'express'
import Ajv, { JSONSchemaType } from 'ajv'

import AppError from '@shared/Errors/AppError'

import globalMessages from '@shared/global/globalMessages'

interface IDataRequest {
  _id: string
  name: string
  address: string
  status: 'Ativo' | 'Inativo'
}

export default async function validateUpdateLabRequest(
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
      address: { type: 'string' },
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
    })

    if (errorItems.length > 0)
      throw new AppError(globalMessages.invalidParameters, 400, errorItems)

    return next()
  }

  if (!validate(data)) {
    throw new AppError(globalMessages.invalidParameters)
  }

  if (data.status) {
    if (data.status !== 'Ativo' && data.status !== 'Inativo') {
      throw new AppError(globalMessages.invalidParameters)
    }
  }

  return next()
}
