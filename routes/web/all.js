const router = require("express").Router()


router.get("/add_product", (req, res) => {
  res.status(200).render("addProduct.ejs")
})


router.get("/", (req, res) => {
  res.render("web.ejs");
})

module.exports = router