import 'reflect-metadata'
import 'express-async-errors'

import '@shared/infra/mongoose'
import '@shared/containers'

import express from 'express'
import appRoot from 'app-root-path'

import routes from '@shared/infra/http/routes'

import GlobalExceptionHandler from '@shared/Errors/GlobalExceptionHandler'

const app = express()
const port = process.env.PORT || 8888

app.use(express.json())

app.use(routes)

app.use(GlobalExceptionHandler)

app.use(express.static(appRoot + '/public'))

app.listen(port, () => {
  console.log('🚀 O servidor está online! PORTA:' + port)
})
