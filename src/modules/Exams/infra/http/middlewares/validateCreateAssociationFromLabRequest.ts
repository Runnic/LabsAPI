import { Request, Response, NextFunction } from 'express'
import Ajv, { JSONSchemaType } from 'ajv'

import AppError from '@shared/Errors/AppError'

import globalMessages from '@shared/global/globalMessages'

import ICreateAssociationsFromLabDTO from '@modules/Exams/DTOS/ICreateAssociationsFromLabDTO'

export default async function validateCreateAssociationFromLabRequest(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const ajv = new Ajv()
  const data = { labId: req.params._id, examsIds: req.body }

  const schema: JSONSchemaType<ICreateAssociationsFromLabDTO> = {
    type: 'object',
    properties: {
      labId: { type: 'string', minLength: 24, maxLength: 24 },
      examsIds: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            _id: { type: 'string', minLength: 24, maxLength: 24 },
          },
          required: ['_id'],
          additionalProperties: false,
        },
      },
    },
    required: ['labId'],
    additionalProperties: false,
  }

  const validate = ajv.compile(schema)

  if (!validate(data)) {
    throw new AppError(globalMessages.invalidParameters)
  }

  return next()
}
