const errorDictionary = require('../errors/errorDictionary');

function errorHandler(err, req, res, next) {
  const errorResponse = errorDictionary[err.message] || errorDictionary['UNKNOWN_ERROR'];
  res.status(errorResponse.status).json({ error: errorResponse.message });
}

module.exports = errorHandler;
