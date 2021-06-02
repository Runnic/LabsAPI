import 'reflect-metadata'
import 'express-async-errors'

import '@shared/infra/mongoose'
import '@shared/containers'

import express from 'express'
import appRoot from 'app-root-path'

import routes from '@shared/infra/http/routes'

import GlobalExceptionHandler from '@shared/Errors/GlobalExceptionHandler'
import validadeJsonBody from './middlewares/validateJsonBody'

const app = express()
const PORT = process.env.PORT || 7777 // Skr Skr Skr

app.use(express.json({ verify: validadeJsonBody }))

app.use(routes)

app.use(GlobalExceptionHandler)

app.use(express.static(appRoot + '/public'))

app.listen(PORT, () => {
  console.log('🚀 O servidor está online! PORTA: ' + PORT)
})
