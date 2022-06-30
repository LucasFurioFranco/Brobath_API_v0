const mongoose = require("mongoose")

const Product = mongoose.model("Product", {
    name: String, //og:title
    description: String, //og:description //group description
    image: String, //og:image
    brand: String, //product:brand
    stock: Number,  //product:availability (implicitly)
    condition: String, //product:condition
    price: Number, //product:price:amoun
    priceTo: Number, //discount price - uisually starts with undefined or null
    currency: String, //product:price:currenc
    variantName: String,
    variantDescriptionPre: String, //Description of variant before group description
    variantDescriptionPos: String, //Description of variant after group description
    content: String,
    categories: [String],
    groupId: String, //product:item_group_id
    sku: String //product:retailer_item_id
    
})

module.exports = Product
