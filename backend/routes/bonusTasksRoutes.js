const express = require("express");
const { search } = require("../controllers/bonusTasksController");

const router = express.Router();

//Search Functionality
router.route("/").get(search);
//getUserOrder
// router.route("/myorders").get(protect, getMyOrders);

// //delete order
// router.route("/delete/:id").delete(protect, deleteFromCart);

module.exports = router;
