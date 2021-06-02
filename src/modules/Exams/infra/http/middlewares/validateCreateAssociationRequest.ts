import { Request, Response, NextFunction } from 'express'
import Ajv, { JSONSchemaType } from 'ajv'

import AppError from '@shared/Errors/AppError'

import globalMessages from '@shared/global/globalMessages'

interface IDataRequest {
  examId: string
  labId: string
}

export default async function validateCreateAssociationRequest(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const ajv = new Ajv()
  const data = req.body

  const schema: JSONSchemaType<IDataRequest> = {
    type: 'object',
    properties: {
      examId: { type: 'string', minLength: 24, maxLength: 24 },
      labId: { type: 'string', minLength: 24, maxLength: 24 },
    },
    required: ['examId', 'labId'],
    additionalProperties: false,
  }

  const validate = ajv.compile(schema)

  if (data instanceof Array) {
    const errorItems = data.filter((item) => {
      if (!validate(item)) return true
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
