const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TarefaSchema = new Schema({
  // name: String,
  "tarefa": String,
  "concluida": String
  
})

module.exports = mongoose.model('Tarefa', TarefaSchema)