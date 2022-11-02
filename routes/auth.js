const express = require("express");
const { matchedData } = require("express-validator");
const { encrypt } = require("../utils/handlePassword");
const router = express.Router();
const { validatorRegister, validatorLogin } = require("../validators/auth")
const { registerCtrl, loginCtrl } = require("../controllers/auth");


/**
 * Crear un registro
 */
router.post("/register", validatorRegister, registerCtrl);
router.post("/login", validatorLogin, loginCtrl);

module.exports = router;