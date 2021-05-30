import mongoose, { Document, Schema } from 'mongoose'

import IExam from '@modules/Exams/interfaces/IExam'

export interface IExamMongoose extends Document, IExam {}

const ExamSchema = new Schema({
  name: {
    type: String,
    required: true,
  },

  type: {
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

export default mongoose.model<IExamMongoose>('Exam', ExamSchema)
