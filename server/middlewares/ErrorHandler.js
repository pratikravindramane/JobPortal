const ErrorHandler = (err, req, res, next) => {
  console.log(err);
  res.send({ message: err.message, stack: err.stack });
};

module.exports = ErrorHandler;
