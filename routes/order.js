var express = require('express')
var router = express.Router();

const {isSignedIn,isAuthenticated,isAdmin} = require("../controllers/auth")
const {getUserById,pushOrderInPurchaseList} = require("../controllers/user")
const {getOrderById,createOrder,getAllorder,getOrderStatus,UpdateOrderStatus} = require("../controllers/order")
const {updateStock} = require("../controllers/product")

router.param("userId",getUserById);
router.param("orderId",getOrderById);

router.post("order/create/:userId",isSignedIn,isAuthenticated,pushOrderInPurchaseList,updateStock,createOrder);
router.get("order/all/:userId" ,isSignedIn,isAuthenticated,isAdmin,getAllorder)
router.get("order/status/:userId" ,isSignedIn,isAuthenticated,isAdmin,getOrderStatus)
router.put("order/:orderId/status/:userId" ,isSignedIn,isAuthenticated,isAdmin,UpdateOrderStatus)

module.exports = router;
