import mongoose from 'mongoose'

import env from '@config/env'

const URI = `mongodb+srv://${env.mongodb.user}:${env.mongodb.password}@cluster0.eixmq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

export default mongoose.connect(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
