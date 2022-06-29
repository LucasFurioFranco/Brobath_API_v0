//config inicial
require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const app = express()


//forma de ler JSON / midlewares
app.use(
  express.urlencoded({
    extended: true
  })
)

//Informa o express que vamos trabalhar com JSON
app.use(express.json())


//Cadastro de rotas da API
const personRoutes = require("./routes/personRoutes")

app.use("/person", personRoutes)


//rota inicial / endpoint
app.get("/", (req, res) => {
  
  // mostrar requisição

  res.json({message: "Oi Express"})

})

//Wildcard
app.get("*", (req, res) => {
  res.status(404).json({error: "This is a wildcard page (future 404)"})
})

//entregar uma porta
app.listen(3000)

// const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD)

const DB_USER = process.env.DB_USER
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD)
const DB_NAME = process.env.DB_NAME
const APP_PORT = process.env.APP_PORT

var connectTo = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster1.y8bph.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;
console.log("connectTo", connectTo)
//console.log("connectTo", connectTo)

mongoose.connect(connectTo)
  .then(() => {
    app.listen(APP_PORT)
    console.log("Conectamos ao MongoDB")
  })
  .catch((err) => {
    console.error(err);
  })
