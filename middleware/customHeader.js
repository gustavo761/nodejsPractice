const customHeader = (req, res, next) => {
  try {
    const apiKey = req.headers.api_key;

    if (apiKey === 'valorapi') {
      next();
    } else {
      res.status(403);
      res.send({ error: 'OCURRIÓ UN ERROR' })
    }

  } catch (e) {
    res.status(403);
    res.send({ error: 'OCURRIÓ UN ERROR' })
  }
};

module.exports = customHeader;