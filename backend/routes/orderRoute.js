const express = require("express");
const {
  addOrderItem,

  deleteFromCart,
  getMyOrders,
} = require("../controllers/orderController");
const { protect } = require("../middlewares/authMiddleware");
const router = express.Router();

//craete new order
router.route("/").post(protect, addOrderItem);
//getUserOrder
router.route("/myorders").get(protect, getMyOrders);

//delete order
router.route("/delete/:id").delete(protect, deleteFromCart);

module.exports = router;
