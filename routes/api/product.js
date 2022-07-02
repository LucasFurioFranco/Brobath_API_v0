const router = require("express").Router()
const Product = require("../../models/Product")

function productExtractor(obj) {
  return {
    name: obj.name,
    description: obj.description,
    image: obj.image,
    brand: obj.brand,
    stock: obj.stock,
    condition: obj.condition,
    price: obj.price,
    priceTo: obj.priceTo,
    currency: obj.currency,
    variantName: obj.variantName,
    content: obj.content,
    categories: obj.categories,
    groupId: obj.groupId,
    sku: obj.sku
  }
}

//Create - Registering of products
router.post("/", async (req, res) => {

  const product = productExtractor(req.body);

  if(!product.name) {
    res.status(422).json({error: "O nome do produto é obrigatório"})
    return
  }

  // create
  try {

    var insertedProduct = await Product.create(product)

    res.status(201).json({
      message: "Produto inserido com sucesso",
      insertedProduct: insertedProduct
    })

  } catch(ex) {
    res.status(500).json({error: ex})
    return
  }

})


//Read - retrieve all the products
router.get("/", async (req, res) => {

  try {
    const product = await Product.find()

    res.status(200).json(product)

  } catch(ex) {
    res.status(500).json({error: ex})
    return
  }

})


//Read - retrieve product by _id
router.get("/id/:id", async (req, res) => {

  const id = req.params.id

  try {

    const product = await Product.findOne({_id: id})

    if(!product) {
      res.status(422).json({error: `Nenhum produto encontrada pelo ID ${id}`})
      return
    } else {
      res.status(200).json(product)
    }

    } catch(ex) {
      res.status(500).json({error: ex})
      return
    }

})


//Read - retrieve product by sku
router.get("/sku/:id", async (req, res) => {

  const id = req.params.id

  try {

    const product = await Product.findOne({sku: id})

    if(!product) {
      res.status(422).json({error: `Nenhum produto encontrada pelo SKU ${id}`})
      return
    } else {
      res.status(200).json(product)
    }

    } catch(ex) {
      res.status(500).json({error: ex})
      return
    }

})


//Read - retrieve products by groupId
router.get("/:id", async (req, res) => {

  const id = req.params.id

  try {

    const product = await Product.find({groupId: id}) //Gets an Array of products

    if(!product) {
      res.status(422).json({error: `Nenhum produto encontrada pelo group ID ${id}`})
      return
    } else {
      res.status(200).json(product)
    }

    } catch(ex) {
      res.status(500).json({error: ex})
      return
    }

})


//Update - parcial update of a product by _id
router.patch("/:id", async (req, res) => {

  const id = req.params.id
  const product = productExtractor(req.body);

  try {

    const updatedProduct = await Product.updateOne({_id: id}, product)

    if(updatedProduct.matchedCount === 0) {
      res.status(422).json({error: `Nenhum produto encontrada pelo ID ${id}`})
      return

    } else {
      res.status(200).json({
        message: "Product " + (updatedProduct.modifiedCount ? "updated" : "not updated - no fields to update - new values are equal to stored values"),
        updatedFields: updatedProduct.modifiedCount
      })

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
    const product = await Product.findOne({_id: id})

    if(!product) {
      res.status(422).json({error: `Nenhum produto encontrada pelo ID ${id}`})
      return

    } else {
      await Product.deleteOne({_id: id})
      res.status(200).json({message: "Produto removido com sucesso"})
      
    }

  } catch(ex) {
    res.status(500).json({error: ex})
    return
  }


})


//---------------------------------------------------------
//------------------------ FUTURE -------------------------
//---------------------------------------------------------


//Retrieve products using categories

//Retrieve products by common search
//  - name
//  - descriptions (default and variants)

//Think about deleting by groupId


//---------------------------------------------------------
//-------------------- END OF FUTURE ----------------------
//---------------------------------------------------------



module.exports = router