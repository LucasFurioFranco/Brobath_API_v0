const router = require("express").Router()

//Create - Registering of products
router.get("/", async (req, res) => {

  res.render("web.ejs");

})

module.exports = router