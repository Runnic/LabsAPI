import dotenv from 'dotenv'

dotenv.config()

const envVariables = {
  mongodb: {
    user: process.env.MONGODB_USER,
    password: process.env.MONGODB_PASSWORD,
  },
}

export default envVariables
