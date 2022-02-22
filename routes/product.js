const express = require("express");
const router = express.Router();

const { create, productById, read, remove } = require("../controllers/product");

const { requireSignIn, isAdmin, isAuth } = require("../controllers/auth");

const { userById } = require("../controllers/user");


router.post("/product/create/:userId",requireSignIn,isAuth,isAdmin, create);

router.get("/product/:productId", read);
router.delete("/product/:productId/:userId", requireSignIn,isAuth,isAdmin, remove);

router.param("userId", userById);
router.param("productId", productById);

module.exports = router;
