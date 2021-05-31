import dotenv from 'dotenv'

dotenv.config()

if (
  process.env.MONGODB_USER === undefined ||
  process.env.MONGODB_PASSWORD === undefined
)
  throw new Error(
    'Credências MONGODB não configuradas, veja o arquivo README.md para mais informações.'
  )

const envVariables = {
  mongodb: {
    user: process.env.MONGODB_USER,
    password: process.env.MONGODB_PASSWORD,
  },
}

export default envVariables
