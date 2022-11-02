const { matchedData } = require("express-validator");
const { encrypt } = require("../utils/handlePassword");
const { tokenSign } = require("../utils/handleJwt");
const { usersModel } = require("../models");
const { handleHttpError } = require("../utils/handleError");
const { compare } = require("bcryptjs");

const registerCtrl = async (req, res) => {
  try {
    req = matchedData(req);
    const password = await encrypt(req.password);
    const body = {...req, password};
    const dataUser = await usersModel.create(body);
    dataUser.set("password", undefined, { strict: false });
    const data = {
      token: tokenSign(dataUser),
      user: dataUser
    }
    res.send({ data });
  } catch (e) {
    handleHttpError(res, "ERROR_REGISTER_USER")
  }
}

const loginCtrl = async (req, res) => {
  try {
    req = matchedData(req);
    const user = await usersModel.findOne({ email: req.email })
      .select('password name role email');
    if (!user){
      handleHttpError(res, "USER_NOT_FOUND");
      return;
    }
    const hashPassword = user.password;
    const check = await compare(req.password, hashPassword);

    if (!check) {
      handleHttpError(res, "PASSWORD_INVALID", 403);
      return;
    }
    user.set('password', undefined, {strict: false});
    const data = {
      token: await tokenSign(user),
      user
    }
    res.send({ data })
  } catch (e) {
    handleHttpError(res, "ERROR_LOGIN_USER")
  }
}

module.exports = { registerCtrl, loginCtrl };