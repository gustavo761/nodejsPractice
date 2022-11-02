const { handleHttpError } = require("../utils/handleError");
const { verifyToken } = require("../utils/handleJwt");

const authMiddleware = async (req, res, next) => {
  try {
    if(!req.headers.authorization) {
      handleHttpError( res, "NOT_TOKEN", 401);
      return;
    }

    const token = req.headers.authorization.split(' ').pop();
    const dataToken = await verifyToken(token);

    if (!dataToken._id) {
      handleHttpError(req, "ERROR_ID_TOKEN", 401);
      return;
    }

    req.payload = getIdUser(token);

    next();
  } catch (e) {
    handleHttpError(res, "NOT_SESSION", 401);
  }
}

const getIdUser = (token) => {
  return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
}

module.exports = authMiddleware;