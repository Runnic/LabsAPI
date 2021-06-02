import dotenv from 'dotenv'

dotenv.config()

let url = ''

if (process.env.MONGODB_ATLAS_CONNECTION_URL === undefined)
  url =
    'mongodb+srv://PUBLIC:A6SqJRlXZx4SnkP9@maincluster.eixmq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
else url = process.env.MONGODB_ATLAS_CONNECTION_URL

const envVariables = {
  mongoDbAtlas: {
    url,
  },
}

export default envVariables
