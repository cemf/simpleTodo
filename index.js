const mongoose = require('mongoose')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const MongoClient = require('mongodb').MongoClient
const tarefaController = require('./Controllers/TarefasController')
const Tarefa = require('./Models/Tarefa')
const { json } = require('body-parser')
const { criaUsuario } = require('./Controllers/TarefasController')

const url = 'mongodb://127.0.0.1:27017/todolist'

mongoose.connect(url, { useNewUrlParser: true })

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(express.static('public'))

app.listen(3000, function () {
  console.log('listening on 3000')
})

const db = mongoose.connection

db.once('open', (_) => {
  console.log('Database connected:', url)
})

db.on('error', (err) => {
  console.error('connection error:', err)
})

// app.get('/', function (req, res) {
//   res.send('hello world')
// })

app.get('/', (req, res) => {

    tarefaController
    .getAllTarefas()
    .then((result) => {
      res.send(JSON.stringify(result))
    })
    .catch((err) => {
      console.log('erro:', err)
    })
})
app.get('/encontrar/:id', (req, res) => {
    const id = req.params.id;
    tarefaController
    .getOne({"_id":id})
    .then((result) => {
        res.send(JSON.stringify(result))
      })
      .catch((err) => {
        console.log('erro:', err)
      })

})

app.post('/cria_usuario', (req, res) => {   
  const create = async () => {
    //   console.log("get req >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>,",req)
    return await tarefaController.criaUsuario(req.body)
  }
  create().then((resp)=>{
    res.send('Sucesso');
  }).catch((error) => console.error(error))
})

app.post('/criaTarefa',(req,res)=>{
    const create = async () => {
        //   console.log("get req >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>,",req)
        return await tarefaController.criaTarefa(req.body)
      }
      create().then((resp)=>{
        res.send('Sucesso');
      }).catch((error) => console.error(error))
    
})

app.delete('/DelAll', (req, res) => {
    const del = async () => {
      return await tarefaController.deleteAll()
    }
    del()
      .then((resp) => {
        if (resp) {
          res.json('tudo ok')
        } else {
          res.json('Erro ao deletar tudo')
        }
      })
      .catch((error) => console.error(error))
  })

app.post('/updateTarefa/:id',(req, res) => {   
    const id = req.params.id;
    console.log(res.body)
    const update = async () =>{
        return await tarefaController.tarefaFindByIdAndUpdate(id, res.body)
    }
    update()
      .then((resp) => {
          console.log('resposdata',resp)
        if (resp) {
          res.json('tudo ok')
        } else {
          res.json('modificar deu ruim')
        }
      })
      .catch((error) => console.error(error))
  })
    




// cria usuario ---
// ve usuarios e tarefas ---
// editar, acrescentar deletar tarefas no usuario 
// deleta usuario
// deleta tarefa
// update tarefa(concluida)

// {
//     "nome":"fulano",
//     "tarefas":[{
//         "lavarCarro":{
//             "concluido":false
//         }
//         "escrever coisas":{
//             "concluido":false
//         }
//     }]
// }