import mongoose, { Document, Schema } from 'mongoose'

import IAssociation from '@modules/Exams/interfaces/IAssociation'

export interface IAssociationMongoose extends Document, IAssociation {}

const AssociationSchema = new Schema({
  examId: {
    type: String,
    required: true,
  },

  labId: {
    type: String,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
})

export default mongoose.model<IAssociationMongoose>(
  'Association',
  AssociationSchema
)
