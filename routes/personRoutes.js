const router = require("express").Router()
const Person = require("../models/Person")

//Create - Cadastro de pessoa
router.post("/", async (req, res) => {

  // req.body
  const {name, salary, approved} = req.body
  
  if(!name) {
    res.status(422).json({error: "O nome é obrigatório"})
    return
  }

  const person = {
    name,
    salary,
    approved
  }

  // create
  try {

    await Person.create(person)

    res.status(201).json({message: "Pessoa inserida com sucesso"})

  } catch(ex) {
    res.status(500).json({error: ex})
    return
  }

})


//Read - leitura de dados - todas as pessoas
router.get("/", async (req, res) => {

  try {

    //O método find retorna todos os dados do documento Person
    const people = await Person.find()

    res.status(200).json(people)

  } catch(ex) {
    res.status(500).json({error: ex})
    return
  }

})

//Read - leitura de uma pessoa específica (por _id)
router.get("/:id", async (req, res) => {

  //extrair o dado da requisição (que está no caminho da URL)
  const id = req.params.id

  try {

    const person = await Person.findOne({_id: id})

    if(!person) {
      res.status(422).json({error: `Nenhuma pessoa encontrada pelo ID ${id}`})
      return
    } else {
      res.status(200).json(person)
    }

    } catch(ex) {
      res.status(500).json({error: ex})
      return
    }

})

//Update - 
//Nota: PUT: trocar tudo, PATCH: atualização parcial
router.patch("/:id", async (req, res) => {

  const id = req.params.id
  const {name, salary, approved} = req.body

  const person = {
    name,
    salary,
    approved
  }

  try {

    const updatedPerson = await Person.updateOne({_id: id}, person)

    if(updatedPerson.matchedCount === 0) {
      res.status(422).json({error: `Nenhuma pessoa encontrada pelo ID ${id}`})
      return

    } else {
      //Podemos saber quantos dados foram atualizados por meio do
      //updatedPerson.modifiedCount
      res.status(200).json(Object.assign({updatedFields: updatedPerson.modifiedCount}, person))

    }

  } catch(ex) {
    res.status(500).json({error: ex})
    return
  }
})


//Delete
router.delete("/:id", async (req, res) => {
  const id = req.params.id

  try {
    const person = await Person.findOne({_id: id})

    if(!person) {
      res.status(422).json({error: `Nenhuma pessoa encontrada pelo ID ${id}`})
      return

    } else {
      await Person.deleteOne({_id: id})
      res.status(200).json({message: "Usuário removido com sucesso"})
      
    }

  } catch(ex) {
    res.status(500).json({error: ex})
    return
  }


})



module.exports = router