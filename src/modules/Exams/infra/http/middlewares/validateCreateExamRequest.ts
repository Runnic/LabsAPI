import { Request, Response, NextFunction } from 'express'
import Ajv, { JSONSchemaType } from 'ajv'

import AppError from '@shared/Errors/AppError'

import globalMessages from '@shared/global/globalMessages'

interface IDataRequest {
  name: string
  type: string
}

export default async function validateCreateExamRequest(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const ajv = new Ajv()
  const data = req.body

  const schema: JSONSchemaType<IDataRequest> = {
    type: 'object',
    properties: {
      name: { type: 'string' },
      type: { type: 'string' },
    },
    required: ['name', 'type'],
    additionalProperties: false,
  }

  const validate = ajv.compile(schema)

  if (data instanceof Array) {
    const errorItems = data.filter((item) => {
      if (!validate(item)) return true

      if (item.type !== 'Imagem' && item.type !== 'Análise Clínica') return true
    })

    if (errorItems.length > 0)
      throw new AppError(globalMessages.invalidParameters, 400, errorItems)

    return next()
  }

  if (!validate(data)) {
    throw new AppError(globalMessages.invalidParameters)
  }

  return next()
}
