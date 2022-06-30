require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const app = express()



//------------------------------------
//-----------Middlewares--------------
//------------------------------------

app.use(
  express.urlencoded({
    extended: true
  })
)

//For JSON payloads (for requests and responses)
app.use(express.json())

//ejs is responsible to rendering HTML pages dynamically
app.set("view engine", "ejs")


//------------------------------------
//--------------Routing---------------
//------------------------------------

const routes = {
  person: require("./routes/api/person"),
  product: require("./routes/api/product"),
  web: require("./routes/web/all")
}

app.use("/api/person", routes.person)
app.use("/api/product", routes.product)

const enableWeb = true;
if(enableWeb) {
  app.use("/web", routes.web)

  //Web index
  app.get("/", (req, res) => {
    res.status(404).render("index.ejs", {
      timestamp: Date.now()
    })
  })

}

//Wildcard
app.get("*", (req, res) => {
  res.status(404).json({error: "this route does not exist"})
})




const DB_USER = process.env.DB_USER
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD)
const DB_NAME = process.env.DB_NAME
const DB_HOSTNAME = process.env.DB_HOSTNAME
const APP_PORT = process.env.APP_PORT

var connectTo = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOSTNAME}/${DB_NAME}?retryWrites=true&w=majority`;

mongoose.connect(connectTo)
  .then(() => {
    app.listen(APP_PORT)
    console.log("Conectamos ao MongoDB")
  })
  .catch((err) => {
    console.error(err);
  })
