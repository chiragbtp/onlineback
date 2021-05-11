var express = require('express')
var router = express.Router();

const {getProductById,createProduct,getProduct,photo,updateProduct,deleteProduct,getAllproducts,getAllUniqueCategory} = require("../controllers/product")
const {isSignedIn,isAuthenticated,isAdmin} = require("../controllers/auth")
const {getUserById} = require("../controllers/user")

router.param("userId",getUserById);
router.param("productId",getProductById);

router.post("/product/create/:userId",isSignedIn,isAuthenticated,isAdmin,createProduct)
router.get("/product/:productId",getProduct)
router.get("/product/photo/:productId",photo)
router.put("/product/:productId/:userId",isSignedIn,isAuthenticated,isAdmin,updateProduct)

router.delete("/product/:productId/:userId",isSignedIn,isAuthenticated,isAdmin,deleteProduct)
router.get("/allProducts",getAllproducts)
router.get("/product/categories/",getAllUniqueCategory)



module.exports = router;
