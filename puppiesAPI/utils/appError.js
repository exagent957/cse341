/*eslint-disable*/
class AppError extends Error {
  constructor(message, statusCode) {
    super(message); //calls parent class, sets message property to incoming message
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;