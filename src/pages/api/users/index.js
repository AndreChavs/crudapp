/*Api -> Nessa Rota, a API é responsável por manipular a requisição do usuario e retornar a resposta dessa requisição*/

import connectMongo from '../../../../database/connection'
import { getUsers, postUsers } from '../../../../database/controller'

export default async function handler(req, res) {
  connectMongo().catch((error) => {
    res.status(405).json({ error: `Erro de Conexão com database: ${error}` })
  })
  const { method } = req
  switch (method) {
    case 'GET':
      getUsers(req, res) //Controller
      break
    case 'POST':
      postUsers(req, res) //Controller
      break
    default:
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).end(`Method ${method} Not Allowd`)
  }
}
