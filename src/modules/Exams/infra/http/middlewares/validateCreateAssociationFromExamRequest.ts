import { Request, Response, NextFunction } from 'express'
import Ajv, { JSONSchemaType } from 'ajv'

import AppError from '@shared/Errors/AppError'

import globalMessages from '@shared/global/globalMessages'

import ICreateAssociationsFromExamDTO from '@modules/Exams/DTOS/ICreateAssociationsFromExamDTO'

export default async function validateCreateAssociationFromExamRequest(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const ajv = new Ajv()
  const data = { examId: req.params._id, labsIds: req.body }

  const schema: JSONSchemaType<ICreateAssociationsFromExamDTO> = {
    type: 'object',
    properties: {
      examId: { type: 'string', minLength: 24, maxLength: 24 },
      labsIds: {
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
    required: ['examId'],
    additionalProperties: false,
  }

  const validate = ajv.compile(schema)

  if (!validate(data)) {
    throw new AppError(globalMessages.invalidParameters)
  }

  return next()
}
