import { Request, Response, NextFunction } from 'express'
import Ajv, { JSONSchemaType } from 'ajv'

import AppError from '@shared/Errors/AppError'

import globalMessages from '@shared/global/globalMessages'

interface IDataRequest {
  _id: string
}

export default async function validateDeleteLabRequest(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const ajv = new Ajv()
  const data = req.body

  const schema: JSONSchemaType<IDataRequest> = {
    type: 'object',
    properties: {
      _id: { type: 'string', minLength: 24, maxLength: 24 },
    },
    required: ['_id'],
    additionalProperties: false,
  }

  const validate = ajv.compile(schema)

  if (data instanceof Array) {
    const errorItems = data.filter((item) => !validate(item))

    if (errorItems.length > 0)
      throw new AppError(globalMessages.invalidParameters, 400, errorItems)

    return next()
  }

  if (!validate(data)) {
    throw new AppError(globalMessages.invalidParameters)
  }

  return next()
}
