const { StatusCodes } = require('http-status-codes')
const { CustomAPIError } = require('../errors')

const errorHandlerMiddleware = (err, req, res, next) => {
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ msg: err.message })
  }
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({message:'Something went wrong try again later',msg:err.message})
}

module.exports = errorHandlerMiddleware
