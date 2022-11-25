const { json } = require('express')
const Tarefas = require('../Models/Tarefa')

class TarefasController {
  async getAllTarefas() {
    const allPeople = await Tarefas.find()
    return allPeople
  }

  async getOne(id){
    const person = await Tarefas.find(id)
    return person
  }

  async seachTask(task){
    const tarefa = await Tarefas.find(task)
    return tarefa
  }

  async criaUsuario(pessoa) {
      if(pessoa.length >0){
          console.log("foi nao")
      }else{
        try{
            await Tarefas.create(pessoa)
           return 'sucess'
          }catch(e){
            console.log("erro ao criar pessoa",e)
          }
      }
  }

  async criaTarefa(tarefa) {
    try{
        tarefa.status = "pendente"
        await Tarefas.create(tarefa)
       return 'sucess'
      }catch(e){
        console.log("erro ao criar pessoa",e)
      }
  }

  async updateQuote(update){
    await Tarefas.updateOne(update)
  }

  async tarefaFindByIdAndUpdate(id,update){
    await Tarefas.findByIdAndUpdate(id,update)
    return update
  }

  async deletePersonByName(pessoa){
    await Tarefas.deleteOne(pessoa)
  }

  async deleteAll(){
    await Tarefas.deleteMany({})
  }
}

module.exports = new TarefasController()