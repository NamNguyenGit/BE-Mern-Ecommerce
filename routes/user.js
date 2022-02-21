const express = require("express");
const router = express.Router();

const { signUp, signIn } = require("../controllers/user");
const {userSignupValidator} = require("../validator")

router.post("/signUp",userSignupValidator, signUp);
router.post("/signIn", signIn);

module.exports = router;
