import connectMongo from '../../../../database/connection'
import { getUser, putUser, deleteUser } from '../../../../database/controller'

export default async function handler(req, res) {
  connectMongo().catch((error) => {
    res.status(405).json({ error: `Erro de Conexão com database: ${error}` })
  })
  const { method } = req
  // const id = req.query.id //Não é mais necessário
  switch (method) {
    case 'GET':
      getUser(req, res)
      break
    case 'PUT':
      putUser(req, res)
      break
    case 'DELETE':
      deleteUser(req, res)
      break
    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE'])
      res.status(405).end(`Method ${method} Not Allowd`)
  }
}
