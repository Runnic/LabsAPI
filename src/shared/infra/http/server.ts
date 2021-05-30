import 'reflect-metadata'
import 'express-async-errors'

import '@shared/infra/mongoose'
import '@shared/containers'

import express from 'express'

import routes from '@shared/infra/http/routes'

import GlobalExceptionHandler from '@shared/Errors/GlobalExceptionHandler'

const app = express()
const port = 8888

app.use(express.json())

app.use(routes)

app.use(GlobalExceptionHandler)

app.listen(port, () => {
  console.log('🚀 O servidor está online! PORTA:' + port)
})
