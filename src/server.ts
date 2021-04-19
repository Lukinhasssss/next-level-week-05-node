import express from 'express'

const app = express()

app.get('/', (request, response) => {
  return response.json({ message: "Hello World!" })
})

app.post('/', (request, response) => {
  return response.json({ message: "Usuário salvo com sucesso!" })
})

app.listen(3333, () => console.log('🔥 server is running at http://localhost:3333'))