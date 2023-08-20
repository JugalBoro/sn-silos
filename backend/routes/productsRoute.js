const express = require("express");
const {
  getProduct,
  getProducts,
  deleteProduct,
  updateProduct,
  createProduct,
} = require("../controllers/productsController");
const router = express.Router();

//GET ROUTE FOR ALL PRODUCTS
router.route("/products").get(getProducts);

//GET ROUTE FOR SINGLE PRODUCT
router.route("/products/:id").get(getProduct);

//DELETE single Product
router.route("/products/delete/:id").delete(deleteProduct);

//UPDATE single Product
router.route("/products/update/:id").patch(updateProduct);

//CREATE Product
router.route("/products/createProduct").post(createProduct);
module.exports = router;
