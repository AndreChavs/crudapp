/*Request -> São funções assíncronas que retornam uma promessa. Essa função envia os dados através de uma requisição e aguarda o retorno da resposta via HTTP.*/

const apiUrl = 'http://localhost:3000'

//get Users
export async function getUsers() {
  const response = await fetch(`${apiUrl}/api/users`)
  const json = await response.json()
  return json
}

//post User ->
export async function postUser(formData) {
  try {
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    }
    const response = await fetch(`${apiUrl}/api/users`, options)
    const json = await response.json()
    return json
  } catch (error) {
    return error
  }
}

//updating User
export async function updateUser(id, formData) {
  try {
    const options = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    }
    const response = await fetch(`${apiUrl}/api/users/${id}`, options)
    const json = await response.json()
    return json
  } catch (error) {
    return error
  }
}

//deleting user
export async function deleteUser(id) {
  try {
    const options = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    }
    const response = await fetch(`${apiUrl}/api/users/${id}`, options)
    const json = await response.json()
    return json
  } catch (error) {
    return error
  }
}
