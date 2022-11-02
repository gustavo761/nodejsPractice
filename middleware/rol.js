const { handleHttpError } = require("../utils/handleError");

const checkRol = (rol) => (req, res, next) => {
  try {
    const { payload } = req;
    console.log(payload);
    const rolesByUser = payload.role;

    const checkValueRol = rol.some((rolSingle) => rolesByUser.includes(rolSingle));
    if (!checkValueRol) {
      handleHttpError(res, "USER_NOT_PERMISIONS", 403);
      return;
    }
    next();
    
  } catch (e) {
    handleHttpError(res, "ERROR_PERMISIONS", 403);
  }
}

module.exports = checkRol;