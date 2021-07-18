const router = require("express").Router();
const ProductCntrl = require("../../Controller/ProductCntrl");
const prod = require("../../Models/ProductModel");

router
  .route("/products")
  .get(ProductCntrl.getProduct)
  .post(ProductCntrl.addProduct);
router
  .route("/products/:id")
  .put(ProductCntrl.updateProduct)
  .delete(ProductCntrl.deleteProduct)
  .get(ProductCntrl.getsingleProduct);

module.exports = router;
