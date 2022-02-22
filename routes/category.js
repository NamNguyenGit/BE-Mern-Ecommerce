const express = require("express");
const router = express.Router();

const { create, categoryById, read } = require("../controllers/category");

const { requireSignIn, isAdmin, isAuth } = require("../controllers/auth");

const { userById } = require("../controllers/user");

router.get("/category/:categoryId", read);

router.post("/category/create/:userId",requireSignIn,isAuth,isAdmin, create);

router.param("userId", userById);
router.param("categoryId", categoryById);

module.exports = router;
