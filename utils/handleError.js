const handleHttpError = (res, message = 'ALGO SUCEDIÓ', code = 403) => {
  res.status(code);
  res.send({ error: message });
};

module.exports = { handleHttpError };