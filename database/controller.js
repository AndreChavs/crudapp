/*Controller -> Quando a requisição é feita através da rota da API a função do controlador é chamada de acordo com o método da requisição.No caso do método POST, os dados do corpo da requisição enviado pelo usuário para a rota da API é armazenado em uma constante, em seguida é convertido em um 'model' para o Banco de dados e finaliza com a resposta, em JSON, à requisição do usuário.*/

import Users from '../models/user'

//GET Users : http://localhost:3000/api/users
export async function getUsers(req, res) {
  try {
    const users = await Users.find({})
    if (!users) {
      res.status(404).json({ error: 'Data not found' })
    }
    res.status(200).json({ users: users })
  } catch (error) {
    return res.status(404).json({ error: `Fetching data error: ${error}` })
  }
}

//GET User : http://localhost:3000/api/users/{id}
export async function getUser(req, res) {
  try {
    const { id } = req.query
    if (id) {
      const user = await Users.findById(id)
      return res.status(200).json({ user: user })
    } else {
      return res.status(404).json({ error: 'Cannot get the User...!' })
    }
  } catch (error) {
    return res.status(404).json({ error: `Cannot get user: ${error}` })
  }
}

//POST User : http://localhost:3000/api/users
export async function postUsers(req, res) {
  try {
    const formData = req.body
    if (!formData) {
      return res.status(404).json({ error: `Data not provider` })
    }
    await Users.create(formData, (error, data) => {
      return res.status(200).json({ data: data })
    })
  } catch (error) {
    return res
      .status(404)
      .json({ error: `Error while Fetching Data: ${error}` })
  }
}

//PUT User : http://localhost:3000/api/users/{id}
export async function putUser(req, res) {
  try {
    const { id } = req.query
    const formData = req.body
    if (id && formData) {
      await Users.findByIdAndUpdate(id, formData)
      return res.status(200).json({ id: id, data: formData })
    }
  } catch (error) {
    return res
      .status(404)
      .json({ error: `Error while updating Data: ${error}` })
  }
}

//DELETE Controller : http://localhost:3000/api/users/{id}
export async function deleteUser(req, res) {
  try {
    const { id } = req.query
    if (id) {
      const user = await Users.findByIdAndDelete(id)
      return res.status(200).json({ deleted: user })
    }
    return res.status(404).json({ error: 'User not selected!' })
  } catch (error) {
    return res
      .status(404)
      .json({ error: `Error while Deleting User: ${error}` })
  }
}
