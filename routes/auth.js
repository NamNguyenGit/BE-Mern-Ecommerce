const express = require("express");
const router = express.Router();

const { signUp, signIn, signOut, requireSignIn } = require("../controllers/auth");
const {userSignupValidator} = require("../validator")

router.post("/signUp",userSignupValidator, signUp);
router.post("/signIn", signIn);
router.get("/signOut", signOut);



module.exports = router;
