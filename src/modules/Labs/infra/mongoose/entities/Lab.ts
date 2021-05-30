import mongoose, { Document, Schema } from 'mongoose'

import ILab from '@modules/Labs/interfaces/ILab'

export interface ILabMongoose extends Document, ILab {}

const LabSchema = new Schema({
  name: {
    type: String,
    required: true,
  },

  address: {
    type: String,
    required: true,
  },

  status: {
    type: String,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
})

export default mongoose.model<ILabMongoose>('Lab', LabSchema)
